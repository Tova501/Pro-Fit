namespace ProFit.Core.ResultModels
{
    public class Result<T>
    {
        public T Value { get; }
        public bool IsSuccess { get; }
        public string ErrorMessage { get; }
        public int ErrorCode { get; }

        private Result(T value)
        {
            Value = value;
            IsSuccess = true;
        }
        private Result(string errorMessage, int errorCode)
        {
            ErrorMessage = errorMessage;
            ErrorCode = errorCode;
            IsSuccess = false;
            ErrorCode = errorCode;
        }
        public static Result<T> Success(T value) => new Result<T>(value);
        public static Result<T> Failure(string errorMessage, int errorCode) => new Result<T>(errorMessage, errorCode);
    }
}