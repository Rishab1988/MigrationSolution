using System;

namespace Migration.RewardProgram.Nominee
{
    public interface INominee
    {
        string Address { get; set; }
        DateTime? CreatedAt { get; set; }
        DateTime DateOfBirth { get; set; }
        string Id { get; set; }
        string Name { get; set; }
        NomineeRelation Relation { get; set; }
        DateTime? UpdatedAt { get; set; }
    }
}