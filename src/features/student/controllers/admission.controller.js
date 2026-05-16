import { ApiResponse } from "../../../utils/ApiResponse.js";

import { asyncHandler } from "../../../utils/asyncHandler.js";
import { createAdmissionService } from "../services/admission.service.js";

const createAdmission = asyncHandler(async (req, res) => {
  const admission = await createAdmissionService(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, admission, "Admission created successfully"));
});

export { createAdmission };
