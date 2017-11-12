// tslint:disable:object-literal-sort-keys

// DO NOT EDIT
// auto-generated by generated_model.ts from public_api_v1.yaml

export const specs = {
  swagger: "2.0",
  info: {
    version: "0.0.1",
    title: "Digital Citizenship API",
    description: "Digital Citizenship API."
  },
  host: "localhost",
  basePath: "/api/v1",
  schemes: ["https"],
  security: [{ SubscriptionKey: [] }],
  paths: {
    "/messages/{fiscal_code}/{id}": {
      parameters: [
        { $ref: "#/parameters/FiscalCode" },
        {
          name: "id",
          in: "path",
          type: "string",
          required: true,
          description: "The ID of the message."
        }
      ],
      get: {
        operationId: "getMessage",
        summary: "Get Message",
        description:
          "The previously created message with the provided message ID is returned.",
        responses: {
          "200": {
            description: "Message found.",
            schema: { $ref: "#/definitions/MessageResponse" },
            examples: {
              "application/json": {
                message: {
                  id: "1",
                  fiscal_code: "QXJNTX9RCRVD6V4O",
                  time_to_live: 3600,
                  content: {
                    subject: "aliquip sint nulla in estinut",
                    markdown:
                      "Excepteur estinut inincididunt laboris culpa officiaeuexercitation quisLorem in et est"
                  },
                  sender_service_id: "1"
                },
                notification: { email: "QUEUED" }
              }
            }
          },
          "404": { description: "No message found for the provided ID." }
        }
      }
    },
    "/messages/{fiscal_code}": {
      parameters: [{ $ref: "#/parameters/FiscalCode" }],
      get: {
        operationId: "getMessagesByUser",
        summary: "Get messages by user",
        description:
          'Returns the messages for the user identified by the provided fiscal code.\nMessages will be returned in inverse acceptance order (from last to first).\nThe "next" field, when present, contains an URL pointing to the next page of results.',
        responses: {
          "200": {
            description: "Found.",
            schema: {
              allOf: [
                {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/definitions/CreatedMessage" }
                    }
                  }
                },
                { $ref: "#/definitions/PaginationResponse" }
              ]
            },
            examples: {
              "application/json": {
                items: [
                  {
                    id: "1",
                    fiscal_code: "PUPFHK4TD3MWL20W",
                    time_to_live: 3600,
                    content: {
                      subject: "amet sunt dolor nulla esseesseanim",
                      markdown:
                        "eu irure esseesseanim ut eiusmodirure proidentdolor auteirure aliqua enim sinttempor labore"
                    },
                    sender_service_id: "1"
                  },
                  {
                    id: "2",
                    fiscal_code: "PKTINH4QDQUV696L",
                    time_to_live: 3600,
                    content: {
                      subject: "idUt quis tempor esseesseanim",
                      markdown:
                        "eiusmod involuptate eiusmod sint adtempor Duis enimdoloraliquip Duissunt dolore non"
                    },
                    sender_service_id: "2"
                  }
                ],
                page_size: 2,
                next: "https://example.com/next"
              }
            }
          },
          "404": { description: "No message found." }
        },
        parameters: [{ $ref: "#/parameters/PaginationRequest" }]
      },
      post: {
        operationId: "submitMessageforUser",
        summary: "Submit a message",
        description:
          "Submits a message to a user.\nOn error, the reason is returned in the response payload.",
        parameters: [
          {
            name: "message",
            in: "body",
            schema: { $ref: "#/definitions/NewMessage" },
            "x-examples": {
              "application/json": {
                time_to_live: 3600,
                content: {
                  subject: "ipsum labore deserunt fugiat",
                  markdown:
                    "culpa nisi deserunt fugiatautesintdodeseruntesse reprehenderit incididuntlaboris"
                },
                default_addresses: { email: "foobar@example.com" }
              }
            }
          }
        ],
        responses: {
          "201": {
            description: "Message created.",
            headers: {
              Location: {
                type: "string",
                description:
                  "Location (URL) of created message resource.\nA GET request to this URL returns the message status and details."
              }
            },
            examples: { "application/json": {} }
          },
          "400": {
            description: "Invalid payload.",
            schema: { $ref: "#/definitions/ProblemJson" },
            examples: {}
          },
          "500": {
            description: "The message cannot be delivered.",
            schema: { $ref: "#/definitions/ProblemJson" }
          }
        }
      }
    },
    "/profiles/{fiscal_code}": {
      get: {
        operationId: "getProfile",
        summary: "Get User's Preferences",
        description:
          "Returns the preferences for the user identified by the provided fiscal code.",
        responses: {
          "200": {
            description: "Found.",
            schema: {
              allOf: [
                { $ref: "#/definitions/LimitedProfile" },
                { $ref: "#/definitions/ExtendedProfile" }
              ]
            },
            examples: {
              "application/json": { email: "foobar@example.com", version: 0 }
            }
          },
          "404": { description: "No user found for the provided fiscal code." }
        }
      },
      parameters: [{ $ref: "#/parameters/FiscalCode" }],
      post: {
        responses: {
          "200": {
            description: "Profile updated.",
            schema: {
              allOf: [
                { $ref: "#/definitions/LimitedProfile" },
                { $ref: "#/definitions/ExtendedProfile" }
              ]
            },
            examples: {
              "application/json": { email: "foobar@example.com", version: 0 }
            }
          },
          "400": { description: "Invalid payload." },
          "500": { description: "Profile cannot be updated." }
        },
        description:
          "Create or update the preferences for the user identified by the provided fiscal code.",
        operationId: "upsertProfile",
        summary: "Set User's Preferences",
        parameters: [
          {
            in: "body",
            name: "body",
            schema: { $ref: "#/definitions/ExtendedProfile" },
            "x-examples": {
              "application/json": { email: "foobar@example.com" }
            }
          }
        ]
      }
    },
    "/info": {
      get: {
        operationId: "getInfo",
        responses: {
          "200": {
            description: "Returns success if the API-Key is right.",
            schema: { type: "object", properties: {} }
          },
          "401": {
            description:
              "Returns unauthorized when the API-key if empty or wrong."
          }
        },
        description:
          "An endpoint to test authenticated access to the API backend.",
        summary: "API test endpoint"
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
          example: "Connection to database timed out"
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
      "x-extensible-enum": ["QUEUED", "SENT_TO_CHANNEL"]
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
        "^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$"
    },
    MessageSubject: {
      type: "string",
      description:
        "The (optional) subject of the message - note that only some notification\nchannels support the display of a subject. When a subject is not provided,\none gets generated from the client attributes.",
      minLength: 10,
      maxLength: 120
    },
    MessageBodyMarkdown: {
      type: "string",
      description:
        "The full version of the message, in plain text or Markdown format. The\ncontent of this field will be delivered to channels that don't have any\nlimit in terms of content size (e.g. email, etc...).",
      minLength: 80,
      maxLength: 10000
    },
    PaginationResponse: {
      type: "object",
      title: "pagination",
      description: "Pagination response parameters.",
      properties: {
        page_size: {
          type: "integer",
          minimum: 1,
          description: "Number of items returned for each page."
        },
        next: {
          type: "string",
          description:
            "Contains an URL to GET the next #<page_size> results in the retrieved collection of items.",
          format: "uri"
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
        "This parameter specifies for how long (in seconds) the system will try to deliver the message to the channels configured by the user."
    },
    HttpStatusCode: {
      type: "integer",
      format: "int32",
      description:
        "The HTTP status code generated by the origin server for this occurrence\nof the problem.\n",
      minimum: 100,
      maximum: 600,
      exclusiveMaximum: true,
      example: 503
    },
    NewMessageDefaultAddresses: {
      type: "object",
      description:
        "Default addresses for notifying the recipient of the message.",
      properties: {
        email: {
          $ref: "#/definitions/EmailAddress",
          description:
            "The recipient will be notified to this email address in case no email is set in the recipient profile."
        }
      }
    },
    EmailAddress: { type: "string", format: "email" },
    PreferredLanguage: {
      type: "string",
      "x-extensible-enum": ["it_IT", "en_GB", "es_ES", "de_DE", "fr_FR"]
    },
    PreferredLanguages: {
      type: "array",
      items: { $ref: "#/definitions/PreferredLanguage" },
      description:
        "Indicates the User's preferred written or spoken languages in order of preference. Generally used for selecting a localized User interface. Valid values are concatenation of the ISO 639-1 two letter language code, an underscore, and the ISO 3166-1 2 letter country code; e.g., 'en_US' specifies the language English and country US."
    }
  },
  responses: {},
  parameters: {
    PaginationRequest: {
      name: "cursor",
      in: "query",
      type: "string",
      minimum: 1,
      description:
        "An opaque identifier that points to the next item in the collection.",
      "x-example": "1"
    },
    FiscalCode: {
      name: "fiscal_code",
      in: "path",
      type: "string",
      maxLength: 16,
      minLength: 16,
      required: true,
      description: "The fiscal code of the user, all upper case.",
      pattern:
        "[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]",
      "x-example": "SPNDNL80R13C555X"
    }
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    SubscriptionKey: {
      type: "apiKey",
      name: "Ocp-Apim-Subscription-Key",
      in: "header",
      description: "The API key obtained through the developer portal."
    }
  }
};
