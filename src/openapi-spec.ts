/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/auth/login': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': {
            email: string;
            password: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              /** Format: email */
              email: string;
              tel: string;
              firstname: string;
              lastname: string;
              role: 'CUSTOMER' | 'MANAGER';
              verified: boolean;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/signup': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': {
            email: string;
            password: string;
            tel: string;
            firstname: string;
            lastname: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              email: string;
              tel: string;
              lastname: string;
              firstname: string;
              role: 'CUSTOMER' | 'MANAGER';
              verified: boolean;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/logout': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/otp/verify/{userId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Verify the OTP for the user */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
        };
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': {
            otp: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/otp/generate/{userId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Send an email containing the OTP to the user's email */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              message: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/user': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              role: 'CUSTOMER' | 'MANAGER';
              /** Format: email */
              email: string;
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/checkout': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Create Order
     * @description Create an order for this user. This API endpoint facilitates the creation of an order, including the generation of an item for the specified model and its addition to the order. If the user chooses a digital wallet for checkout, ensure to call the appropriate digital checkout API for further processing.
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          /** @example {
           *       "total_price": 45000,
           *       "shipping_fee": 15000,
           *       "est_deli_time": "2023-11-25T13:30:00",
           *       "district": "string",
           *       "ward": "string",
           *       "street": "string",
           *       "streetNo": "string",
           *       "isPaid": false,
           *       "extra_note": "string"
           *     } */
          'application/json': {
            total_price: number;
            shipping_fee: number;
            est_deli_time: string;
            district: string;
            ward: string;
            street: string;
            streetNo: string;
            extra_note: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/checkout/paypal/completing': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Complete PayPal Order */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          /** @example {
           *       "intent": "CAPTURE",
           *       "paypalOrderId": "Order_id_is_in_result_of_create_order_api"
           *     } */
          'application/json': {
            /** @default CAPTURE */
            intent: string;
            /** @description The id of Paypal order you get when creating */
            paypalOrderId: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              amountMoney: number;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/checkout/paypal/creating': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create PayPal Order */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': {
            intent: string;
            orderId: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/cart': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all models in the cart of the current user (based on jwt) */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              total: number;
              cart: {
                quantity: number;
                id: string;
                name: string;
                price: number;
                discount?: number;
                image?: string;
                isDiscontinued: boolean;
                isUserUploaded: boolean;
              }[];
            };
          };
        };
      };
    };
    put?: never;
    /** Add some models to the cart of the current user (based on jwt) */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': {
            models: {
              /** @description The id of the model to add to cart */
              id: string;
              /** @description The number to add to cart */
              quantity: number;
            }[];
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              message: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    /** Reset the cart of the current user (based on jwt) */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              message: string;
            };
          };
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/cart/delete': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Remove some models from the cart of the current user (based on jwt) */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': {
            /** @description A list of model ids to delete from the cart */
            models: string[];
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              message: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/model': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all default models */
    get: {
      parameters: {
        query?: {
          /** @description The substring that the model name should contain */
          keyword?: string;
          /**
           * @description The date after which the model was uploaded, specified in ISO format
           * @example 2023-12-18
           */
          uploaded_after?: string;
          /**
           * @description The date before which the model was uploaded, specified in ISO format
           * @example 2023-12-25
           */
          uploaded_before?: string;
          /** @description The category id */
          categoryId?: string;
          /** @description The minimum threshold for number of likes */
          likes_ge?: number;
          /** @description For pagination purpose - the index of the start item, starting at 0 */
          start?: number;
          /** @description For pagination purpose - the number of items to return */
          noItems?: number;
          /** @description The name of the field to order on */
          orderBy?: 'likesNo' | 'uploadedTime' | 'price' | 'name' | 'numberBought';
          /** @description Sort ascending or descending */
          order?: 'asc' | 'desc';
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              total: number;
              models: {
                id: string;
                name: string;
                price: number;
                imageUrl: string;
                category_id: string;
                category: string;
                likesNo: number;
                /** Format: date-time */
                uploadTime: string;
                description: string;
                numberBought: number;
                subImages: string[];
                discount?: number;
              }[];
            };
          };
        };
      };
    };
    put?: never;
    /**
     * Upload a default model
     * @description Only the manager can do this
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: {
        content: {
          'application/json': {
            name: string;
            price: number;
            gcode: string;
            imageUrl: string;
            category_id: string;
            description?: string;
            subImageUrls?: string[];
            discount: number;
          }[];
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              total: number;
              models: {
                id: string;
                name: string;
                price: number;
                imageUrl: string;
                category_id: string;
                category: string;
                likesNo: number;
                /** Format: date-time */
                uploadTime: string;
                description: string;
                numberBought: number;
                subImages: string[];
                discount?: number;
              }[];
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/model/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get a default model with the specified id */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              name: string;
              price: number;
              category_id: string;
              category: string;
              imageUrl: string;
              likesNo: number;
              gcode: string;
              /** Format: date-time */
              uploadTime: string;
              description: string;
              numberBought: number;
              subImages: string[];
              discount?: number;
              isDiscontinued: boolean;
            };
          };
        };
      };
    };
    /**
     * Update a default model with the specified id
     * @description Only the manager can do this
     */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: {
        content: {
          'application/json': {
            name?: string;
            price?: number;
            gcode?: string;
            imageUrl?: string;
            category_id?: string;
            description?: string;
            subImageUrls?: string[];
            discount?: number;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              message: string;
            };
          };
        };
      };
    };
    post?: never;
    /**
     * Delete a default model with the specified id
     * @description Only the manager can do this
     */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              message: string;
            };
          };
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/model/{id}/toggle-like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Toggle the `like` status of a customer for a model. The current user is inferred based on jwt */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              userId: string;
              modelId: string;
              liked: boolean;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/model/{id}/discontinue': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** Mark Default Model as Discontinued. Also, remove it from all current user carts. */
    patch: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: {
            message?: string;
          };
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    trace?: never;
  };
  '/api/userModel': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get all user models
     * @description If the user is a manager, it can view all models. If the user is a student, it can view its models
     */
    get: {
      parameters: {
        query?: {
          /** @description The substring that the model name should contain */
          keyword?: string;
          /**
           * @description The date after which the model was uploaded, specified in ISO format
           * @example 2023-12-18
           */
          uploaded_after?: string;
          /**
           * @description The date before which the model was uploaded, specified in ISO format
           * @example 2023-12-25
           */
          uploaded_before?: string;
          /** @description For pagination purpose - the index of the start item, starting at 0 */
          start?: number;
          /** @description For pagination purpose - the number of items to return */
          noItems?: number;
          /** @description The name of the field to order on */
          orderBy?: 'uploadedTime' | 'price' | 'name';
          /** @description Sort ascending or descending */
          order?: 'asc' | 'desc';
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              total: number;
              models: {
                id: string;
                name: string;
                price: number;
                /** Format: date-time */
                uploadTime: string;
              }[];
            };
          };
        };
      };
    };
    put?: never;
    /** Upload a user-defined model */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: {
        content: {
          'application/json': {
            name: string;
            gcode: string;
            description?: string;
          }[];
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              total: number;
              models: {
                id: string;
                name: string;
                price: number;
                /** Format: date-time */
                uploadTime: string;
              }[];
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/userModel/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get the user model with the specified id
     * @description A customer can only view its user models
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              name: string;
              price: number;
              gcode: string;
              /** Format: date-time */
              uploadTime: string;
            };
          };
        };
      };
    };
    /**
     * Update a user model
     * @description Only the customer can do this
     */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: {
        content: {
          'application/json': {
            name?: string;
            price?: number;
            gcode?: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              message: string;
            };
          };
        };
      };
    };
    post?: never;
    /** Delete the user model with the specified id */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              message: string;
            };
          };
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/slides': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get slide images for home page */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              /** Format: uri */
              src: string;
              alt: string;
            }[];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/category': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all category */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              name: string;
            }[];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/order': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all orders of the current customer. For managers, return all orders */
    get: {
      parameters: {
        query?: {
          /**
           * @description The date after which the order was created, specified in ISO format
           * @example 2023-12-18
           */
          created_after?: string;
          /**
           * @description The date before which the order was created, specified in ISO format
           * @example 2023-12-25
           */
          created_before?: string;
          /** @description Filter on paid statud */
          isPaid?: boolean;
          /** @description Filter on order status */
          status?:
            | 'ORDER_PENDING'
            | 'ORDER_PROCESSED'
            | 'PRINT_PENDING'
            | 'PRINTED'
            | 'DELIVERING'
            | 'DELIVERED'
            | 'REJECTED';
          /** @description Filter on user id, only meaningful for managers */
          userId?: string;
          /** @description For pagination purpose - the index of the start item, starting at 0 */
          start?: number;
          /** @description For pagination purpose - the number of items to return */
          noItems?: number;
          /** @description The name of the field to order on */
          orderBy?: 'totalPrice' | 'shippingFee' | 'creationTime';
          /** @description Sort ascending or descending */
          order?: 'asc' | 'desc';
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              total: number;
              orders: {
                id: string;
                userId: string;
                totalPrice: number;
                shippingFee: number;
                /** Format: date-time */
                estimatedDeliveryTime: string;
                status:
                  | 'ORDER_PENDING'
                  | 'ORDER_PROCESSED'
                  | 'PRINT_PENDING'
                  | 'PRINTED'
                  | 'DELIVERING'
                  | 'DELIVERED'
                  | 'REJECTED';
                district: string;
                ward: string;
                street: string;
                streetNo: string;
                /** Format: date-time */
                creationTime: string;
                isPaid: boolean;
                note?: string;
                digitalOrderId?: string;
              }[];
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/order/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get the order with the specified id and owned by the current user. For managers, they can view the order without owning it */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              userId: string;
              totalPrice: number;
              shippingFee: number;
              /** Format: date-time */
              estimatedDeliveryTime: string;
              status:
                | 'ORDER_PENDING'
                | 'ORDER_PROCESSED'
                | 'PRINT_PENDING'
                | 'PRINTED'
                | 'DELIVERING'
                | 'DELIVERED'
                | 'REJECTED';
              district: string;
              ward: string;
              street: string;
              streetNo: string;
              /** Format: date-time */
              creationTime: string;
              isPaid: boolean;
              note?: string;
              digitalOrderId?: string;
              items: {
                model_id: string;
                gcode: string;
                name: string;
                quantity: number;
                imageUrl: string;
              }[];
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    /** Update the info of an order. For managers only */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: {
        content: {
          'application/json': {
            /** @description Order status */
            status?:
              | 'ORDER_PENDING'
              | 'ORDER_PROCESSED'
              | 'PRINT_PENDING'
              | 'PRINTED'
              | 'DELIVERING'
              | 'DELIVERED'
              | 'REJECTED';
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              userId: string;
              totalPrice: number;
              shippingFee: number;
              /** Format: date-time */
              estimatedDeliveryTime: string;
              status:
                | 'ORDER_PENDING'
                | 'ORDER_PROCESSED'
                | 'PRINT_PENDING'
                | 'PRINTED'
                | 'DELIVERING'
                | 'DELIVERED'
                | 'REJECTED';
              district: string;
              ward: string;
              street: string;
              streetNo: string;
              /** Format: date-time */
              creationTime: string;
              isPaid: boolean;
              note?: string;
              digitalOrderId?: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /**
     * Cancel order.
     * @description This endpoint is used to cancel an order, but only if the status of the order is pending.
     */
    patch: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              userId: string;
              totalPrice: number;
              shippingFee: number;
              /** Format: date-time */
              estimatedDeliveryTime: string;
              status:
                | 'ORDER_PENDING'
                | 'ORDER_PROCESSED'
                | 'PRINT_PENDING'
                | 'PRINTED'
                | 'DELIVERING'
                | 'DELIVERED'
                | 'REJECTED';
              district: string;
              ward: string;
              street: string;
              streetNo: string;
              /** Format: date-time */
              creationTime: string;
              isPaid: boolean;
              note?: string;
              digitalOrderId?: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    trace?: never;
  };
  '/api/order/{id}/paid': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /**
     * Update order payment status to true (For Managers Only).
     * @description This endpoint is used when the customer pays with cash. Only managers are authorized to use this operation.
     */
    patch: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: string;
              userId: string;
              totalPrice: number;
              shippingFee: number;
              /** Format: date-time */
              estimatedDeliveryTime: string;
              status:
                | 'ORDER_PENDING'
                | 'ORDER_PROCESSED'
                | 'PRINT_PENDING'
                | 'PRINTED'
                | 'DELIVERING'
                | 'DELIVERED'
                | 'REJECTED';
              district: string;
              ward: string;
              street: string;
              streetNo: string;
              /** Format: date-time */
              creationTime: string;
              isPaid: boolean;
              note?: string;
              digitalOrderId?: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: never;
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
