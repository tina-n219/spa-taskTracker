import React from 'react';

export default function UserList(props) {
    let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
    return <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>;
  }

   function User(props) {
    let {user} = props;
    return <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
    </tr>;
  }
