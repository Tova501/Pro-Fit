using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using ProFit.Core.Entities;
using ProFit.Core.IServices;

namespace ProFit.Service.Services
{
    public class EmailService:IEmailService
    {
        private readonly IConfiguration configuration;

        public EmailService(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        public async Task<bool> SendEmailAsync(EmailRequest request)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("ProFit", Environment.GetEnvironmentVariable("GOOGLE_USER_EMAIL")));
            emailMessage.To.Add(new MailboxAddress(request.To, request.To));
            emailMessage.Subject = request.Subject;

            var bodyBuilder = new BodyBuilder { TextBody = request.Body };
            emailMessage.Body = bodyBuilder.ToMessageBody();



            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    var smtp = Environment.GetEnvironmentVariable("SMTP_SERVER");
                    var port = int.Parse(Environment.GetEnvironmentVariable("PORT"));
                    var email = Environment.GetEnvironmentVariable("GOOGLE_USER_EMAIL");
                    var password = Environment.GetEnvironmentVariable("GOOGLE_USER_PASSWORD");
                    await client.ConnectAsync(smtp, port, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(email, password);
                    await client.SendAsync(emailMessage);
                    await client.DisconnectAsync(true);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

        }


    }
}

