const { demoRequestService } = require("../services");
const { validationResult } = require("../validations/demo.validator.js");

const createDemoRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ message:"error to create DemoRequires", errors:errors.array() });
    }
    const demoRequest = await demoRequestService.createDemoRequest(req.body);
    res
      .status(201)
      .json({ message: "DemoRequest created successfully", demoRequest });
  } catch (error) {
    console.error("Error creating demoRequest:", error);
    res.status(500).json({ error: "Failed to create demoRequest" });
  }
};

const getDemoRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ message:"error to get DemoRequires", errors:errors.array() });
    }
    const demoRequestId = req.params.id;
    const demoRequest = await demoRequestService.getDemoRequests(demoRequestId);

    if (!demoRequest) {
      return res.status(404).json({ message: "DemoRequest not found" });
    }

    res.status(200).json({ demoRequest });
  } catch (error) {
    console.error("Error fetching demoRequest:", error);
    res.status(500).json({ error: "Failed to fetch demoRequest" });
  }
};

const updateDemoRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ message:"error to update DemoRequires", errors:errors.array() });
    }
    const demoRequestId = req.params.id;
    const updatedDemoRequest = await demoRequestService.updateDemoRequest(
      demoRequestId,
      req.body
    );

    if (!updatedDemoRequest) {
      return res.status(404).json({ message: "DemoRequest not found" });
    }

    res
      .status(200)
      .json({
        message: "DemoRequest updated successfully",
        demoRequest: updatedDemoRequest,
      });
  } catch (error) {
    console.error("Error updating demoRequest:", error);
    res.status(500).json({ error: "Failed to update demoRequest" });
  }
};

const deleteDemoRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ message:"error to delete DemoRequires", errors:errors.array() });
    }
    const demoRequestId = req.params.id;
    const deletedDemoRequest = await demoRequestService.deleteDemoRequest(
      demoRequestId
    );

    if (!deletedDemoRequest) {
      return res.status(404).json({ message: "DemoRequest not found" });
    }

    res.status(200).json({ message: "DemoRequest deleted successfully" });
  } catch (error) {
    console.error("Error deleting demoRequest:", error);
    res.status(500).json({ error: "Failed to delete demoRequest" });
  }
};

module.exports = {
  createDemoRequest,
  getDemoRequest,
  updateDemoRequest,
  deleteDemoRequest,
};
