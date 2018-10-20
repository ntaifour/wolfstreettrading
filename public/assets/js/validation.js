
// ========================================================================== //
// ----------------------- email and password validation --------------------//
// ========================================================================== //

$(function() {
    // Initialize form validation on the registration/login form.
    // It has the name attribute "validation"
    $("form[name='validation']").validate({
      // Specify validation rules
      rules: {
        username: {
          required: true,
        },
        password: {
          required: true,
          minlength: 3
        }
      },
      // Specify validation error messages
      messages: {
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 3 characters long"
        },
        username: "Please provide a usename",
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });
  });
