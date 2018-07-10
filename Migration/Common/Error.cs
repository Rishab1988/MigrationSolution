using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Migration.Common
{

    public interface IParameterError
    {
        string Parameter { get; set; }
        string Message { get; set; }
    }

    [DataContract]
    public class ParameterError : IParameterError
    {
        [DataMember(Order = 1)]
        [JsonProperty("Parameter")]
        public string Parameter { get; set; }
        [DataMember(Order = 2)]
        [JsonProperty("Error")]
        public string Message { get; set; }
    }

    public interface IParameterErrorCollection
    {
        IEnumerable<IParameterError> Parameter { get; set; }
    }

    public class ParameterErrorCollection : IParameterErrorCollection
    {
        [DataMember(Order = 1)]
        [JsonProperty("Errors")]
        public IEnumerable<IParameterError> Parameter { get; set; }
    }


    public interface IParameterErrorRepository
    {
        void Add(Action<IParameterError> parameterError);
        void Add(IParameterError parameterErrors);
        void Add(IEnumerable<IParameterError> parameterErrors);
        IEnumerable<IParameterError> Get();
        IParameterErrorCollection GetCollection();
    }

    public class ParameterErrorRepository : IParameterErrorRepository
    {
        private readonly List<IParameterError> _parameterErrors;
        private readonly List<Action<IParameterError>> _actionParameterErrors;
        private readonly IParameterError _parameterError;
        private readonly IParameterErrorCollection _parameterErrorCollection;


        private IParameterError GetParameterError
        {
            get
            {
                _parameterError.Message = null;
                _parameterError.Parameter = null;
                return _parameterError;
            }
        }

        public ParameterErrorRepository(IParameterErrorCollection parameterErrorCollection, IParameterError parameterError)
        {
            _parameterErrors = new List<IParameterError>();
            _actionParameterErrors = new List<Action<IParameterError>>();
            _parameterErrorCollection = parameterErrorCollection;
            _parameterError = parameterError;
        }

        public void Add(Action<IParameterError> action)
        {
            _actionParameterErrors.Add(action);
            var parameterError = GetParameterError;
            action(parameterError);
            Add(parameterError);
        }

        public void Add(IParameterError parameterError)
        {
            _parameterErrors.Add(parameterError);
        }

        public void Add(IEnumerable<IParameterError> parameterErrors)
        {
            if (parameterErrors == null)
                throw new ArgumentException("required parameter cannot be null", nameof(parameterErrors));
            _parameterErrors.AddRange(parameterErrors);
        }

        public IEnumerable<IParameterError> Get()
        {
            return _parameterErrors;
        }
        public IParameterErrorCollection GetCollection()
        {
           _parameterErrorCollection.Parameter = _parameterErrors;
            return _parameterErrorCollection;
        }
    }
}
