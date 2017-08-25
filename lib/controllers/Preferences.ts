import * as express from "express";
import { INewProfile, ProfileModel } from "../models/profile";
import * as documentDbUtils from "../utils/documentdb";
import { FiscalCode } from "../utils/fiscalcode";
import { HttpReq } from "../utils/httpreq";

const Profile = new ProfileModel(
  documentDbUtils.getDocumentDBClient(),
  documentDbUtils.getCollectionUrl(documentDbUtils.getDatabaseUrl(), "profiles")
);

/**
 * Returns a getProfile handler
 *
 * @param Profile The Profile model.
 *
 * @TODO only return public visible attributes
 */
export function getUserPreferences(
  request: express.Request,
  response: express.Response
) {
  const httpReq = HttpReq.createInstance(request);
  const fiscalCode: FiscalCode = httpReq.getObjectParam("fiscal_code", FiscalCode);

  // i know, this has to be fixed passing FiscalCode and not the string
  // but it's just for example purposes
  Profile.findOneProfileByFiscalCode(fiscalCode.toString()).then(result => {
    if (result != null) {
      response.json({ fiscal_code: result.fiscalCode, email: result.email });
    } else {
      response.status(404).send("Not found");
    }
  });
}

/**
 * Returns an updateProfile controller
 *
 * @param Profile The Profile model.
 *
 * TODO: only return public visible attributes
 */
export function UpdateProfile(
  request: express.Request,
  response: express.Response
) {
  const profile: INewProfile = {
    email: (request as any).swagger.params.email.value,
    fiscalCode: (request as any).swagger.params.fiscal_code.value,
    id: (request as any).swagger.params.fiscal_code.value
  };
  Profile.createOrUpdateProfile(profile).then(result => {
    if (result != null) {
      response.json(result);
    } else {
      response.status(500).send("Cannot create / update profile");
    }
  });
}
