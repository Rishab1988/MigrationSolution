using System;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Migration.RewardProgram.Nominee
{
    public class FilterMapDateConverter : IsoDateTimeConverter
    {

        public FilterMapDateConverter()
        {
            DateTimeFormat = "yyyy-MM-dd";
        }
    }
    public enum NomineeRelation
    {
        [EnumMember]
        Daughter = 3,
        [EnumMember]
        Son = 4,
        [EnumMember]
        Husband = 7,
        [EnumMember]
        Wife = 8
    }



    [DataContract]
    public class Nominee : INominee
    {
        /// <summary>
        /// Nominee Id
        /// </summary>
        [DataMember(Order = 1)]
        [JsonProperty("cunId")]
        public string Id { get; set; }

        /// <summary>
        /// Nominee Name
        /// </summary>
        [DataMember(Order = 2)]
        [JsonProperty("cunName")]
        public string Name { get; set; }

        /// <summary>
        /// Nominee Address
        /// </summary>
        [DataMember(Order = 3)]
        [JsonProperty("cunAddress")]
        public string Address { get; set; }

        /// <summary>
        /// Nominee Address
        /// </summary>
        [DataMember(Order = 4)]
        [JsonProperty("cunRelation")]
        public NomineeRelation Relation { get; set; }

        /// <summary>
        /// Nominee Date of Birth
        /// </summary>
        [DataMember(Order = 5)]
        [JsonProperty("cunDob")]
        public DateTime DateOfBirth { get; set; }

        [DataMember(Order = 6)]
        [JsonProperty("createdAt", NullValueHandling = NullValueHandling.Ignore)]
        [JsonConverter(typeof(FilterMapDateConverter))]
        public DateTime? CreatedAt { get; set; }

        [DataMember(Order = 7)]
        [JsonProperty("updatedAt", NullValueHandling = NullValueHandling.Ignore)]
        [JsonConverter(typeof(FilterMapDateConverter))]
        public DateTime? UpdatedAt { get; set; }
    }
}
