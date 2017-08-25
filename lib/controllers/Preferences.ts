import * as express from "express";
import { INewProfile, ProfileModel } from "../models/profile";
import * as controller from "../utils/controller";
import * as documentDbUtils from "../utils/documentdb";
import { FiscalCode } from "../utils/fiscalcode";

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

export function _getUserPreferences(
  _: express.Request,
  response: express.Response,
  fiscalCode: FiscalCode
) {
  console.log(fiscalCode.toString());
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

export const getUserPreferences = controller.getFor(
  _getUserPreferences,
  "fiscal_code",
  FiscalCode.prototype
);

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
