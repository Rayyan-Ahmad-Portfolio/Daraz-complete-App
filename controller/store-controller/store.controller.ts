import { Request, Response } from "express";



export const createStore = async (req: Request, res: Response) => {
  // Implementation for creating a store
  // write thte implementation of the create a store function here 
  //use the store model
  // decompose to service layer later
  //store can only be created by a user with role 'sStore Owner'
};
export const getStore = async (req: Request, res: Response) => {
  // Implementation for getting store details
  // store can be viewed by store owner, managers, admins and the buyers to browse products
  // decompose to service layer later
};