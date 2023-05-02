var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import User from "./userModel.js";
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
$("#fetchBtn").on("click", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    localStorage.clear();
    try {
      const result = yield $.get("https://reqres.in/api/users?page=1");
      for (const user of result.data) {
        yield User.create(user);
      }
      $("#result").val("").val("Done ✅");
    } catch (error) {
      alert("somthing went wrong");
    }
  })
);
$("#getAllUsers-btn").on("click", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const users = yield User.findAll();
      $("#result").val("").val(JSON.stringify(users, null, 4));
    } catch (error) {
      alert(error);
    }
  })
);
$("#getUser-btn").on("click", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const id = String($("#getUser-inp").val());
      const user = yield User.findById(id);
      $("#result").val("").val(JSON.stringify(user, null, 4));
    } catch (error) {
      alert(error);
    }
  })
);
$("#deleteUser-btn").on("click", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const id = String($("#deleteUser-inp").val());
      User.delete(id);
      $("#result").val("").val("User deleted successfully ✅");
    } catch (error) {
      alert(error);
    }
  })
);
$("#createUser-btn").on("click", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    let newUser = {
      first_name: String($("#createUser-firstname-inp").val()),
      last_name: String($("#createUser-lastname-inp").val()),
      email: String($("#createUser-email-inp").val()),
      avatar: String($("#createUser-avatar-inp").val()),
    };
    const errors = validate(newUser, constraints);
    if (!!errors) {
      const [firstValue] = Object.values(errors);
      return alert(firstValue[0]);
    }
    try {
      newUser = yield User.create(newUser);
      $("#result").val("").val(JSON.stringify(newUser, null, 4));
    } catch (error) {
      alert(error);
    }
  })
);
$("#updateUser-btn").on("click", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    let updatingUser = {
      first_name: String($("#updateUser-firstname-inp").val()),
      last_name: String($("#updateUser-lastname-inp").val()),
      email: String($("#updateUser-email-inp").val()),
      avatar: String($("#updateUser-avatar-inp").val()),
    };
    const errors = validate(updatingUser, constraints);
    if (!!errors) {
      const [firstValue] = Object.values(errors);
      return alert(firstValue[0]);
    }
    try {
      updatingUser = yield User.update(
        Object.assign(
          { id: String($("#updateUser-id-inp").val()) },
          updatingUser
        )
      );
      $("#result").val("").val(JSON.stringify(updatingUser, null, 4));
    } catch (error) {
      alert(error);
    }
  })
);
