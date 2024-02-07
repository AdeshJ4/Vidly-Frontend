import React from "react";

const Membership = ({
  memberships,
  selectedMembership,
  onMembershipSelect,
}) => {
  // console.log(memberships);
  return (
    <ul className="list-group">
      <li
        onClick={() => onMembershipSelect(null)}
        className={
          selectedMembership ? "list-group-item" : "list-group-item active"
        }
      >
        All Memberships
      </li>
      {memberships.map((member, index) => (
        <li
          key={index}
          onClick={() => onMembershipSelect(member)}
          className={
            member === selectedMembership
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {member}
        </li>
      ))}
    </ul>
  );
};

export default Membership;
