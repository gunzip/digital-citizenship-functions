// tslint:disable:object-literal-sort-keys

// DO NOT EDIT
// auto-generated by generated_model.ts from admin_api.yaml

export const specs = {
  swagger: "2.0",
  info: {
    version: "0.0.1",
    title: "Digital Citizenship Admin API.",
    description: "Digital Citizenship Admin API."
  },
  basePath: "/adm",
  schemes: ["https"],
  paths: {
    "/service/{service_id}": {
      parameters: [
        {
          name: "service_id",
          in: "path",
          type: "string",
          required: true,
          description: "The ID of an existing Service."
        }
      ],
      get: {
        operationId: "getService",
        summary: "Get Service",
        description:
          "A previously created service with the provided service ID is returned.",
        responses: {
          "200": {
            description: "Service found.",
            schema: { $ref: "#/definitions/Service" },
            examples: {
              "application/json": {
                id: "2b3e728c1a5d1efa035c-0000000000000001",
                authorized_recipients: ["XXXYYY79A95Y000X"],
                department_name: "dept",
                organization_name: "org",
                service_id: "2b3e728c1a5d1efa035c",
                service_name: "service",
                version: 1,
                authorized_cidrs: []
              }
            }
          },
          "404": { description: "No service found for the provided ID." }
        },
        parameters: []
      },
      put: {
        responses: {
          "200": {
            description: "Service updated.",
            schema: { $ref: "#/definitions/Service" },
            examples: {
              "application/json": {
                id: "2b3e728c1a5d1efa035c-0000000000000001",
                authorized_recipients: ["XXXYYY79A95Y000X"],
                department_name: "dept",
                organization_name: "org",
                service_id: "2b3e728c1a5d1efa035c",
                service_name: "service",
                version: 1,
                authorized_cidrs: []
              }
            }
          },
          "404": { description: "No service found for the provided ID." }
        },
        summary: "Update Service",
        operationId: "updateService",
        description:
          "Update an existing service with the attributes provided in the request payload.",
        parameters: [
          {
            in: "body",
            name: "body",
            schema: { $ref: "#/definitions/Service" },
            description: "The Service payload.",
            "x-examples": {
              "application/json": {
                authorized_recipients: ["XXXYYY79A95Y000X"],
                department_name: "dept",
                organization_name: "org",
                service_id: "2b3e728c1a5d1efa035c",
                service_name: "service",
                authorized_cidrs: []
              }
            }
          }
        ]
      }
    },
    "/debug": {
      get: {
        responses: {
          "200": {
            description:
              "Returns a JSON object with HTTP request parameters, headers and payload.",
            schema: { type: "object", properties: {} },
            examples: {
              "application/json": {
                auth: {
                  groups: [
                    "ApiInfoRead",
                    "ApiMessageRead",
                    "ApiLimitedMessageWrite",
                    "ApiDebugRead"
                  ],
                  kind: "IAzureApiAuthorization",
                  subscriptionId: "9d39a48a64370b1b326dfb70307008",
                  userId: "9d39a48a64370b1b326dfb70307008"
                },
                headers: {
                  "cache-control": "no-cache",
                  connection: "Keep-Alive",
                  accept: "application/json",
                  "accept-encoding": "gzip, deflate",
                  "max-forwards": "10",
                  "user-agent": "PostmanRuntime/6.4.1",
                  "ocp-apim-subscription-key": "d5310672bc1d8cf383ca98",
                  "x-user-id": "9d39a48a64370b1b326dfb70307008",
                  "x-user-groups":
                    "Developers,ApiInfoRead,ApiMessageRead,ApiLimitedMessageWrite,ApiDebugRead",
                  "x-subscription-id": "9d39a48a64370b1b326dfb70307008",
                  "x-user-email": "example@example.com",
                  "x-functions-key": "9d39a48a64370b1b326dfb70307008",
                  "x-forwarded-for": "111.97.111.36, 111.40.111.45:1088",
                  "x-waws-unencoded-url": "/adm/debug",
                  "x-original-url": "/adm/debug",
                  "x-arr-log-id": "9d39a48-a64370b-1b326dfb703-07008",
                  "x-forwarded-proto": "https",
                  "content-type": "application/json",
                  "content-length": "0"
                },
                params: {},
                user: {
                  email: "example@example.com",
                  kind: "IAzureUserAttributes",
                  service: {
                    authorized_recipients: ["XXXBEN86A11Y755X"],
                    department_name: "dept",
                    organization_name: "org",
                    service_id: "9d39a48a64370b1b326dfb70307008",
                    service_name: "service",
                    id: "9d39a48a64370b1b326dfb70307008-0000000000000000",
                    version: 0,
                    authorized_cidrs: [],
                    kind: "IRetrievedService"
                  }
                }
              }
            }
          },
          "401": {
            description:
              "Returns unauthorized when the API-key if empty or wrong."
          }
        },
        description: "An endpoint to debug GET requests to the API backend.",
        operationId: "getDebug",
        summary: "Debug GET"
      },
      post: {
        responses: {
          "200": {
            description:
              "Returns a JSON object with HTTP request parameters, headers and payload.",
            schema: { type: "object", properties: {} },
            examples: {
              "application/json": {
                auth: {
                  groups: [
                    "ApiInfoRead",
                    "ApiMessageRead",
                    "ApiLimitedMessageWrite",
                    "ApiDebugRead"
                  ],
                  kind: "IAzureApiAuthorization",
                  subscriptionId: "9d39a48a64370b1b326dfb70307008",
                  userId: "9d39a48a64370b1b326dfb70307008"
                },
                headers: {
                  "cache-control": "no-cache",
                  connection: "Keep-Alive",
                  accept: "application/json",
                  "accept-encoding": "gzip, deflate",
                  "max-forwards": "10",
                  "user-agent": "PostmanRuntime/6.4.1",
                  "ocp-apim-subscription-key": "d5310672bc1d8cf383ca98",
                  "x-user-id": "9d39a48a64370b1b326dfb70307008",
                  "x-user-groups":
                    "Developers,ApiInfoRead,ApiMessageRead,ApiLimitedMessageWrite,ApiDebugRead",
                  "x-subscription-id": "9d39a48a64370b1b326dfb70307008",
                  "x-user-email": "example@example.com",
                  "x-functions-key": "9d39a48a64370b1b326dfb70307008",
                  "x-forwarded-for": "111.97.111.36, 111.40.111.45:1088",
                  "x-waws-unencoded-url": "/adm/debug",
                  "x-original-url": "/adm/debug",
                  "x-arr-log-id": "9d39a48-a64370b-1b326dfb703-07008",
                  "x-forwarded-proto": "https",
                  "content-type": "application/json",
                  "content-length": "0"
                },
                params: {},
                user: {
                  email: "example@example.com",
                  kind: "IAzureUserAttributes",
                  service: {
                    authorized_recipients: ["XXXBEN86A11Y755X"],
                    department_name: "dept",
                    organization_name: "org",
                    service_id: "9d39a48a64370b1b326dfb70307008",
                    service_name: "service",
                    id: "9d39a48a64370b1b326dfb70307008-0000000000000000",
                    version: 0,
                    authorized_cidrs: [],
                    kind: "IRetrievedService"
                  }
                }
              }
            }
          }
        },
        description: "An endpoint to debug POST requests to the API backend.",
        summary: "Debug POST"
      }
    },
    "/service": {
      post: {
        responses: {
          "200": {
            description: "Service created.",
            schema: { $ref: "#/definitions/Service" },
            examples: {
              "application/json": {
                id: "2b3e728c1a5d1efa035c-0000000000000001",
                authorized_recipients: ["XXXYYY79A95Y000X"],
                department_name: "dept",
                organization_name: "org",
                service_id: "2b3e728c1a5d1efa035c",
                service_name: "service",
                version: 1,
                authorized_cidrs: []
              }
            }
          }
        },
        summary: "Create Service",
        description:
          "Create a new Service with the attributes provided in the requst payload.",
        operationId: "createService",
        parameters: [
          {
            in: "body",
            name: "body",
            schema: { $ref: "#/definitions/Service" },
            description: "The Service payload.",
            "x-examples": {
              "application/json": {
                authorized_recipients: ["XXXYYY79A95Y000X"],
                department_name: "dept",
                organization_name: "org",
                service_id: "2b3e728c1a5d1efa035c",
                service_name: "service",
                authorized_cidrs: []
              }
            }
          }
        ]
      }
    }
  },
  definitions: {
    ProblemJson: {
      title: "Problem Type",
      type: "object",
      properties: {
        type: {
          type: "string",
          format: "uri",
          description:
            "An absolute URI that identifies the problem type. When dereferenced,\nit SHOULD provide human-readable documentation for the problem type\n(e.g., using HTML).\n",
          default: "about:blank",
          example: "https://example.com/problem/constraint-violation"
        },
        title: {
          type: "string",
          description:
            "A short, summary of the problem type. Written in english and readable\nfor engineers (usually not suited for non technical stakeholders and\nnot localized); example: Service Unavailable\n"
        },
        status: { $ref: "#/definitions/HttpStatusCode" },
        detail: {
          type: "string",
          description:
            "A human readable explanation specific to this occurrence of the\nproblem.\n",
          example: "There was an error processing the request"
        },
        instance: {
          type: "string",
          format: "uri",
          description:
            "An absolute URI that identifies the specific occurrence of the problem.\nIt may or may not yield further information if dereferenced."
        }
      }
    },
    MessageContent: {
      title: "MessageContent",
      type: "object",
      properties: {
        subject: { $ref: "#/definitions/MessageSubject" },
        markdown: { $ref: "#/definitions/MessageBodyMarkdown" }
      },
      required: ["markdown"]
    },
    NewMessage: {
      title: "NewMessage",
      type: "object",
      properties: {
        time_to_live: { $ref: "#/definitions/TimeToLive" },
        content: { $ref: "#/definitions/MessageContent" },
        default_addresses: { $ref: "#/definitions/NewMessageDefaultAddresses" }
      },
      required: ["content"]
    },
    NotificationChannelStatus: {
      type: "string",
      "x-extensible-enum": ["QUEUED", "SENT_TO_CHANNEL"],
      example: "SENT_TO_CHANNEL"
    },
    NotificationStatus: {
      title: "NotificationStatus",
      type: "object",
      properties: { email: { $ref: "#/definitions/NotificationChannelStatus" } }
    },
    CreatedMessage: {
      title: "CreatedMessage",
      type: "object",
      properties: {
        id: { type: "string" },
        fiscal_code: { $ref: "#/definitions/FiscalCode" },
        time_to_live: { $ref: "#/definitions/TimeToLive" },
        content: { $ref: "#/definitions/MessageContent" },
        sender_service_id: { type: "string" }
      },
      required: ["fiscal_code", "sender_service_id"]
    },
    MessageResponse: {
      type: "object",
      properties: {
        message: { $ref: "#/definitions/CreatedMessage" },
        notification: { $ref: "#/definitions/NotificationStatus" }
      },
      required: ["message"]
    },
    FiscalCode: {
      type: "string",
      description: "User's fiscal code.",
      pattern:
        "^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$",
      example: "SPNDNL80R13C555X"
    },
    MessageSubject: {
      type: "string",
      description:
        "The (optional) subject of the message - note that only some notification\nchannels support the display of a subject. When a subject is not provided,\none gets generated from the client attributes.",
      minLength: 10,
      maxLength: 120,
      example: "Welcome new user !"
    },
    MessageBodyMarkdown: {
      type: "string",
      description:
        "The full version of the message, in plain text or Markdown format. The\ncontent of this field will be delivered to channels that don't have any\nlimit in terms of content size (e.g. email, etc...).",
      minLength: 80,
      maxLength: 10000,
      example:
        "# This is a markdown header\n\nto show how easily markdown can be converted to **HTML**\n\nRemember: this has to be a long text."
    },
    PaginationResponse: {
      type: "object",
      title: "pagination",
      description: "Pagination response parameters.",
      properties: {
        page_size: {
          type: "integer",
          minimum: 1,
          description: "Number of items returned for each page.",
          example: 2
        },
        next: {
          type: "string",
          description:
            "Contains an URL to GET the next #<page_size> results in the retrieved collection of items.",
          format: "uri",
          example: "https://example.com/?p=0XXX2"
        }
      }
    },
    LimitedProfile: {
      title: "A citizen's profile",
      description:
        "Describes the citizen's profile, mostly interesting for preferences attributes.",
      type: "object",
      properties: {
        preferred_languages: { $ref: "#/definitions/PreferredLanguages" }
      }
    },
    ExtendedProfile: {
      title: "A citizen's profile",
      description:
        "Describes the citizen's profile, mostly interesting for preferences attributes.",
      type: "object",
      properties: {
        email: { $ref: "#/definitions/EmailAddress" },
        preferred_languages: { $ref: "#/definitions/PreferredLanguages" },
        version: { type: "integer" }
      }
    },
    TimeToLive: {
      type: "integer",
      minimum: 3600,
      maximum: 31536000,
      description:
        "This parameter specifies for how long (in seconds) the system will try to deliver the message to the channels configured by the user.",
      example: 3600
    },
    HttpStatusCode: {
      type: "integer",
      format: "int32",
      description:
        "The HTTP status code generated by the origin server for this occurrence\nof the problem.\n",
      minimum: 100,
      maximum: 600,
      exclusiveMaximum: true,
      example: 200
    },
    NewMessageDefaultAddresses: {
      type: "object",
      description:
        "Default addresses for notifying the recipient of the message in case no address for the related channel is set in his profile.",
      properties: { email: { $ref: "#/definitions/EmailAddress" } }
    },
    EmailAddress: {
      type: "string",
      format: "email",
      example: "foobar@example.com"
    },
    PreferredLanguage: {
      type: "string",
      "x-extensible-enum": ["it_IT", "en_GB", "es_ES", "de_DE", "fr_FR"],
      example: "it_IT"
    },
    PreferredLanguages: {
      type: "array",
      items: { $ref: "#/definitions/PreferredLanguage" },
      description:
        "Indicates the User's preferred written or spoken languages in order of preference. Generally used for selecting a localized User interface. Valid values are concatenation of the ISO 639-1 two letter language code, an underscore, and the ISO 3166-1 2 letter country code; e.g., 'en_US' specifies the language English and country US."
    },
    Service: {
      title: "Service",
      description: "A Service tied to an user's subscription.",
      type: "object",
      properties: {
        service_id: { $ref: "#/definitions/ServiceId" },
        service_name: { $ref: "#/definitions/ServiceName" },
        organization_name: { $ref: "#/definitions/OrganizationName" },
        department_name: { $ref: "#/definitions/DepartmentName" },
        authorized_cidrs: {
          type: "array",
          items: { $ref: "#/definitions/CIDR" }
        },
        authorized_recipients: {
          type: "array",
          items: { $ref: "#/definitions/FiscalCode" }
        },
        version: { type: "integer" },
        id: { type: "string" }
      },
      required: [
        "service_id",
        "service_name",
        "organization_name",
        "department_name",
        "authorized_cidrs",
        "authorized_recipients"
      ]
    },
    ServiceId: {
      type: "string",
      description:
        "The ID of the Service. Equals the subscriptionId of a registered API user.",
      minLength: 1
    },
    ServiceName: {
      type: "string",
      description:
        "The name of the service. Will be added to the content of sent messages.",
      minLength: 1
    },
    OrganizationName: {
      type: "string",
      description:
        "The organizazione that runs the service. Will be added to the content of sent messages to identify the sender.",
      minLength: 1
    },
    DepartmentName: {
      type: "string",
      description:
        "The departmenet inside the organization that runs the service. Will be added to the content of sent messages.",
      minLength: 1
    },
    CIDR: {
      type: "string",
      title: "CIDR",
      description: "Describes a single IP or a range of IPs.",
      pattern: "([0-9]{1,3}\\.){3}[0-9]{1,3}(\\/([0-9]|[1-2][0-9]|3[0-2]))?"
    }
  },
  responses: {},
  parameters: {},
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    SubscriptionKey: {
      type: "apiKey",
      name: "Ocp-Apim-Subscription-Key",
      in: "header",
      description: "The API key obtained through the developer portal."
    }
  },
  security: [{ SubscriptionKey: [] }]
};
