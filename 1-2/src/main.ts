import User from "./userModel";

const constraints = {
  first_name: {
    presence: true,
    length: {
      minimum: 1,
      message: "can't be empty",
    },
    format: {
      pattern: /[^\s]+/,
      message: "can't contain only whitespace",
    },
  },
  last_name: {
    presence: true,
    length: {
      minimum: 1,
      message: "can't be empty",
    },
    format: {
      pattern: /[^\s]+/,
      message: "can't contain only whitespace",
    },
  },
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 1,
      message: "can't be empty",
    },
  },
  avatar: {
    url: true,
  },
};

$("#fetchBtn").on("click", async () => {
  localStorage.clear();
  try {
    const result = await $.get("https://reqres.in/api/users?page=1");
    for (const user of result.data) {
      await User.create(user);
    }
    $("#result").val("").val("Done ✅");
  } catch (error: any) {
    alert("somthing went wrong");
  }
});

$("#getAllUsers-btn").on("click", async () => {
  try {
    const users = await User.findAll();
    $("#result").val("").val(JSON.stringify(users, null, 4));
  } catch (error) {
    alert(error);
  }
});

$("#getUser-btn").on("click", async () => {
  try {
    const id = String($("#getUser-inp").val());
    const user = await User.findById(id);
    $("#result").val("").val(JSON.stringify(user, null, 4));
  } catch (error) {
    alert(error);
  }
});

$("#deleteUser-btn").on("click", async () => {
  try {
    const id = String($("#deleteUser-inp").val());
    User.delete(id);
    $("#result").val("").val("User deleted successfully ✅");
  } catch (error) {
    alert(error);
  }
});

$("#createUser-btn").on("click", async () => {
  let newUser = {
    first_name: String($("#createUser-firstname-inp").val()),
    last_name: String($("#createUser-lastname-inp").val()),
    email: String($("#createUser-email-inp").val()),
    avatar: String($("#createUser-avatar-inp").val()),
  };

  const errors = validate(newUser, constraints);
  if (!!errors) {
    const [firstValue]: string[] = Object.values(errors);
    return alert(firstValue[0]);
  }
  try {
    newUser = await User.create(newUser);
    $("#result").val("").val(JSON.stringify(newUser, null, 4));
  } catch (error) {
    alert(error);
  }
});

$("#updateUser-btn").on("click", async () => {
  let updatingUser = {
    first_name: String($("#updateUser-firstname-inp").val()),
    last_name: String($("#updateUser-lastname-inp").val()),
    email: String($("#updateUser-email-inp").val()),
    avatar: String($("#updateUser-avatar-inp").val()),
  };

  const errors = validate(updatingUser, constraints);
  if (!!errors) {
    const [firstValue]: string[] = Object.values(errors);
    return alert(firstValue[0]);
  }
  try {
    updatingUser = await User.update({
      id: String($("#updateUser-id-inp").val()),
      ...updatingUser,
    });
    $("#result").val("").val(JSON.stringify(updatingUser, null, 4));
  } catch (error) {
    alert(error);
  }
});
