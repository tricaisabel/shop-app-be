import Company from "../models/company.model";
import { CompanyData } from "../types/company-data.type";
import mongoose from "mongoose";

export const getAllCompanies = async () => {
  const companies = await Company.find().populate("reviews").exec();
  return companies;
};

export const getCompanyById = async (companyId: string) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  if (!objectIdPattern.test(companyId)) {
    throw new Error("Please provide a valid ObjectId for companyId");
  }

  let company = await Company.findById(companyId);
  if (!company) {
    throw new Error("Company with given id doesn't exist");
  }

  return company;
};

export const createCompany = async (companyData: CompanyData) => {
  const newCompany = await Company.create({
    _id: new mongoose.Types.ObjectId(),
    name: companyData.name,
    url: companyData.url,
    reviews: [],
  });

  return newCompany;
};

export const validateNewCompany = async (name: string): Promise<void> => {
  const user = new Company({
    _id: new mongoose.Types.ObjectId(),
    name,
    url: "url",
  });

  await user.validate();
};

