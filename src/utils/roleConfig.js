// src/config/roleConfig.js
const roleConfig = {
  // Dashboards
  dashboards: {
    prep: ["prep_admin", "admin4", "super_admin"],
    solvent: ["solvent_admin", "admin4", "super_admin"],
    refinery: ["refinery_admin", "super_admin"],
  },

  // Forms
  forms: {
    refinery: ["input_user_1", "master_input_user", "super_admin"],
    prep: ["input_user_2", "master_input_user", "super_admin"],
    solvent: ["input_user_3", "master_input_user", "super_admin"],
  },

  // Full access
  all: ["super_admin"],
};

export default roleConfig;
