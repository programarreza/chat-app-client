import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        toast.success("Login Successfully");
        navigate("/");
        console.log(result.user);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div>
      <div className="w-full min-h-screen flex  bg-cover bg-center">
        <div className="hero">
          <div className="hero-content flex flex-row  rounded-xl justify-between">
            <div
              className="card w-1/1  flex-shrink-0 shadow-2xl "
              data-aos="fade-left"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body w-[350px]"
              >
                <h2 className="text-center text-3xl font-bold mt-5">Login</h2>

                <div className="form-control">
                  <label className="label"></label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-[#006ce1]">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label"></label>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                    placeholder="Password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>

                  {errors.password?.type === "required" && (
                    <p className="text-[#006ce1]">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-[#006ce1]">
                      Password must be 6 Character
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-[#006ce1]">
                      Password must be less den 20 Character
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-[#006ce1]">
                      Password must have one upper case one lower carse, one
                      number and one special character
                    </p>
                  )}
                </div>

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn  bg-[#6198ff] hover:bg-[#006ce1] text-white "
                  >
                    Login Now
                  </button>
                  <p className="text-center mt-2">
                    Are you new user?
                    <Link to={"/register"}>
                      <span className="font-semibold text-[#006ce1] "> Register Now </span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
