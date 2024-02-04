import { useParams } from "react-router-dom";

export const ResetPassword = () => {
	const { resetToken } = useParams();
	
	return (
		<>
			<div className="flex justify-center min-h-[70vh]">

				<form className="my-auto w-[20%]">
					<div className="form-control">
						<input
							type="password"
							placeholder="password"
							className="input input-bordered"
							width={300}
						/>
					</div>
					<div className="form-control mt-6">
						<button className="btn btn-outline">Reset</button>
					</div>
				</form>

			</div>
		</>
	);
};
