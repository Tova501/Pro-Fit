using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;
using ProFit.Core.IServices;

namespace ProFit.Service.Services
{
    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3Service(IConfiguration configuration)
        {
            var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESSKEY");
            var secretKey = Environment.GetEnvironmentVariable("AWS_SECRETKEY");
            var region = Environment.GetEnvironmentVariable("AWS_REGION");
            _bucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME") ?? throw new ArgumentNullException("AWS BucketName is missing");

            if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey) || string.IsNullOrEmpty(region))
            {
                throw new ArgumentNullException("AWS credentials or region are missing");
            }
            _s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.GetBySystemName(region));
        }

        public async Task<string> GeneratePresignedUrlAsync(string folderName, string fileName, string contentType)
        {
            var key = $"{folderName}/{fileName}";

            var request = new PutObjectRequest
            {
                BucketName = _bucketName,
                Key = key,
                ContentType = contentType
            };

            await _s3Client.PutObjectAsync(request);

            var presignedUrlRequest = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(10),
                ContentType = contentType
            };

            return await Task.FromResult(_s3Client.GetPreSignedURL(presignedUrlRequest));
        }

        public async Task<string> GererateDownloadUrlAsync(string folderName, string fileName)
        {
            var key = $"{folderName}/{fileName}";

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(30)
            };

            return await Task.FromResult(_s3Client.GetPreSignedURL(request));
        }

        public async Task<string> GeneratePresignedViewUrlAsync(string key, string contentType)
        {

            var presignedUrlRequest = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(30),
                ResponseHeaderOverrides = new ResponseHeaderOverrides
                {
                    ContentType = contentType,
                    ContentDisposition = "inline" 
                }
            };

            return await Task.FromResult(_s3Client.GetPreSignedURL(presignedUrlRequest));
        }

        public async Task<string> GeneratePresignedUrlUpdateAsync(string path)
        {
            var presignedUrlRequest = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = path,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(15)
            };

            return await Task.FromResult(_s3Client.GetPreSignedURL(presignedUrlRequest));
        }

        public async Task<bool> DeleteAsync(string path)
        {
            try
            {
                var deleteObjectRequest = new DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = path
                };

                var response = await _s3Client.DeleteObjectAsync(deleteObjectRequest);

                return response.HttpStatusCode == System.Net.HttpStatusCode.NoContent;
            }
            catch (AmazonS3Exception ex)
            {
                // Log the exception or handle it as needed
                Console.WriteLine($"Error deleting object from S3: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                Console.WriteLine($"Unexpected error: {ex.Message}");
                return false;
            }
        }

    }
}
