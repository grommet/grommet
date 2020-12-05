/* eslint-disable max-len */
/* Currently not being used */
export const data = {
  openapi: '3.0.1',
  info: {
    title: 'Authorization',
    description:
      'This Document outlines the contracts for HPE Common Cloud Services Authz (RBAC) service API',
    version: '1.0.0',
  },
  paths: {
    '/authorization/app/v1/application_instances/{app_instance_id}/onboard': {
      post: {
        tags: ['on-boarding', 'app-instance-api', 'authorization'],
        summary: 'Application On-board',
        description: 'On-board Application with Authz',
        operationId:
          'onboard_application_authorization_app_v1_application_instances__app_instance_id__onboard_post',
        parameters: [
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'On-Boarding Data',
                allOf: [
                  { $ref: '#/components/schemas/ApplicationRegistration' },
                ],
                description: 'The Application on-board parameters',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RegistrationErrorList' },
              },
            },
          },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/app/v1/application_instances/{app_instance_id}/upgrade': {
      post: {
        tags: ['application-upgrade', 'app-instance-api', 'authorization'],
        summary: 'Application Upgrade',
        description: 'Upgrade Application Authz Settings',
        operationId:
          'upgrade_application_authorization_app_v1_application_instances__app_instance_id__upgrade_post',
        parameters: [
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Upgrade Data',
                allOf: [{ $ref: '#/components/schemas/ApplicationUpgrade' }],
                description: 'The application upgrade parameters',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RegistrationErrorList' },
              },
            },
          },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/app/v1/application_instances/{app_instance_id}': {
      get: {
        tags: ['application-instance', 'app-instance-api', 'authorization'],
        summary: 'Get Application Instance',
        description:
          'Retrieve authorization metadata for an application instance',
        operationId:
          'get_all_customer_application_instance_permissions_authorization_app_v1_application_instances__app_instance_id__get',
        parameters: [
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description:
              'Indicates whether or not to include application resource metadata in the response',
            required: false,
            schema: {
              title: 'Include Application Resources',
              type: 'boolean',
              description:
                'Indicates whether or not to include application resource metadata in the response',
              default: true,
            },
            name: 'include_application_resources',
            in: 'query',
          },
          {
            description:
              'Indicates whether or not to include global permission metadata in the response',
            required: false,
            schema: {
              title: 'Include Permissions',
              type: 'boolean',
              description:
                'Indicates whether or not to include global permission metadata in the response',
              default: true,
            },
            name: 'include_permissions',
            in: 'query',
          },
          {
            description:
              'Indicates whether or not to include predefined roles in the response',
            required: false,
            schema: {
              title: 'Include Roles',
              type: 'boolean',
              description:
                'Indicates whether or not to include predefined roles in the response',
              default: true,
            },
            name: 'include_predefined_roles',
            in: 'query',
          },
          {
            description:
              'Indicates whether or not to include scope resource metadata in the response',
            required: false,
            schema: {
              title: 'Include Scope Resources',
              type: 'boolean',
              description:
                'Indicates whether or not to include scope resource metadata in the response',
              default: true,
            },
            name: 'include_scope_resources',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApplicationInstance' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Application instance not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/app/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/enforce': {
      get: {
        tags: ['enforcement', 'app-instance-api', 'authorization'],
        summary: 'Enforce permissions on resource',
        description:
          'Determine whether or not a subject has permission to a resource',
        operationId:
          'enforce_permission_get_authorization_app_v1_customers__cid__application_instances__app_instance_id__users__user_name__enforce_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
          {
            description:
              'The slug or short name of the permission to test for enforcement',
            required: true,
            schema: {
              title: 'Permission Slug',
              type: 'string',
              description:
                'The slug or short name of the permission to test for enforcement',
            },
            name: 'permission',
            in: 'query',
          },
          {
            description:
              'The slug or short name of the application resource against which to test enforcement',
            required: true,
            schema: {
              title: 'Application Resource Slug',
              type: 'string',
              description:
                'The slug or short name of the application resource against which to test enforcement',
            },
            name: 'application_resource',
            in: 'query',
          },
          {
            description:
              'The slug or short name of the scope resource against which to test enforcement',
            required: false,
            schema: {
              title: 'Scope Resource Slug',
              type: 'string',
              description:
                'The slug or short name of the scope resource against which to test enforcement',
            },
            name: 'scope_resource',
            in: 'query',
          },
          {
            description:
              "The type of user's customer account, e.g. 'msp', 'tenant'",
            required: false,
            schema: {
              title: 'Account Type',
              type: 'string',
              description:
                "The type of user's customer account, e.g. 'msp', 'tenant'",
            },
            name: 'account_type',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EnforcementResponse' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['enforcement', 'app-instance-api', 'authorization'],
        summary: 'Enforce permissions on resource',
        description:
          'Determine whether or not a subject has permission to a resource',
        operationId:
          'enforce_permission_post_authorization_app_v1_customers__cid__application_instances__app_instance_id__users__user_name__enforce_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Enforcement Request',
                allOf: [{ $ref: '#/components/schemas/EnforcementRequest' }],
                description: 'Request parameters for a permission enforcement',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EnforcementResponse' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/app/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/resources': {
      get: {
        tags: ['resource', 'app-instance-api', 'authorization'],
        summary: 'Get User Accessible Resources',
        description:
          'Gets list of resources accessible to a user associated with a customer and application instance',
        operationId:
          'get_user_accessible_resources_authorization_app_v1_customers__cid__application_instances__app_instance_id__users__user_name__resources_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CompactResourcePolicyList',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/app/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}': {
      get: {
        tags: ['user', 'app-instance-api', 'authorization'],
        summary: 'Get User Application Instance',
        description:
          'Retrieve all authorization policies for a single application instance for a user',
        operationId:
          'get_user_application_authorization_app_v1_customers__cid__application_instances__app_instance_id__users__user_name__get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserApplicationInstanceDetails',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/broker/v1/customers/{cid}/scope_resources': {
      get: {
        tags: ['broker-api', 'authorization'],
        summary: 'Get Scope Resources',
        description:
          'Get the list of scope resources that may be applied to authorization policy',
        operationId:
          'get_scope_resources_authorization_broker_v1_customers__cid__scope_resources_get',
        parameters: [
          {
            description: 'The application customer identifier',
            required: true,
            schema: {
              title: 'Application Customer Id',
              type: 'string',
              description: 'The application customer identifier',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description:
              'A filter expression that matches customer resource slugs',
            required: false,
            schema: {
              title: 'Slug',
              type: 'string',
              description:
                'A filter expression that matches customer resource slugs',
            },
            name: 'slug',
            in: 'query',
          },
          {
            description:
              'A filter expression that matches customer resource names',
            required: false,
            schema: {
              title: 'Name',
              type: 'string',
              description:
                'A filter expression that matches customer resource names',
            },
            name: 'name',
            in: 'query',
          },
          {
            description: 'The type of scope resources to get',
            required: true,
            schema: {
              title: 'Type',
              type: 'string',
              description: 'The type of scope resources to get',
            },
            name: 'type',
            in: 'query',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaginatedScopeResourceList',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/broker/v1/predefined_filters': {
      get: {
        tags: ['broker-api', 'authorization'],
        summary: 'Get Predefined Filters',
        description:
          "Get the application's list of predefined scope resource filters",
        operationId:
          'get_predefined_filters_authorization_broker_v1_predefined_filters_get',
        parameters: [
          {
            description:
              'The type of predefined scope resource filterss to get',
            required: true,
            schema: {
              title: 'Type',
              type: 'string',
              description:
                'The type of predefined scope resource filterss to get',
            },
            name: 'type',
            in: 'query',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BaseScopeResourceList' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/application_instances/{app_instance_id}': {
      get: {
        tags: ['application-instance', 'external-api', 'authorization'],
        summary: 'Get Application Instance',
        description:
          'Retrieve authorization metadata for an application instance',
        operationId:
          'get_all_customer_application_instance_permissions_authorization_external_v1_application_instances__app_instance_id__get',
        parameters: [
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description:
              'Indicates whether or not to include application resource metadata in the response',
            required: false,
            schema: {
              title: 'Include Application Resources',
              type: 'boolean',
              description:
                'Indicates whether or not to include application resource metadata in the response',
              default: true,
            },
            name: 'include_application_resources',
            in: 'query',
          },
          {
            description:
              'Indicates whether or not to include global permission metadata in the response',
            required: false,
            schema: {
              title: 'Include Permissions',
              type: 'boolean',
              description:
                'Indicates whether or not to include global permission metadata in the response',
              default: true,
            },
            name: 'include_permissions',
            in: 'query',
          },
          {
            description:
              'Indicates whether or not to include predefined roles in the response',
            required: false,
            schema: {
              title: 'Include Roles',
              type: 'boolean',
              description:
                'Indicates whether or not to include predefined roles in the response',
              default: true,
            },
            name: 'include_predefined_roles',
            in: 'query',
          },
          {
            description:
              'Indicates whether or not to include scope resource metadata in the response',
            required: false,
            schema: {
              title: 'Include Scope Resources',
              type: 'boolean',
              description:
                'Indicates whether or not to include scope resource metadata in the response',
              default: true,
            },
            name: 'include_scope_resources',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApplicationInstance' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Application instance not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/enforce': {
      get: {
        tags: ['enforcement', 'external-api', 'authorization'],
        summary: 'Enforce permissions on resource',
        description:
          'Determine whether or not a subject has permission to a resource',
        operationId:
          'enforce_permission_get_authorization_external_v1_customers__cid__application_instances__app_instance_id__users__user_name__enforce_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
          {
            description:
              'The slug or short name of the permission to test for enforcement',
            required: true,
            schema: {
              title: 'Permission Slug',
              type: 'string',
              description:
                'The slug or short name of the permission to test for enforcement',
            },
            name: 'permission',
            in: 'query',
          },
          {
            description:
              'The slug or short name of the application resource against which to test enforcement',
            required: true,
            schema: {
              title: 'Application Resource Slug',
              type: 'string',
              description:
                'The slug or short name of the application resource against which to test enforcement',
            },
            name: 'application_resource',
            in: 'query',
          },
          {
            description:
              'The slug or short name of the scope resource against which to test enforcement',
            required: false,
            schema: {
              title: 'Scope Resource Slug',
              type: 'string',
              description:
                'The slug or short name of the scope resource against which to test enforcement',
            },
            name: 'scope_resource',
            in: 'query',
          },
          {
            description:
              "The type of user's customer account, e.g. 'msp', 'tenant'",
            required: false,
            schema: {
              title: 'Account Type',
              type: 'string',
              description:
                "The type of user's customer account, e.g. 'msp', 'tenant'",
            },
            name: 'account_type',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EnforcementResponse' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['enforcement', 'external-api', 'authorization'],
        summary: 'Enforce permissions on resource',
        description:
          'Determine whether or not a subject has permission to a resource',
        operationId:
          'enforce_permission_post_authorization_external_v1_customers__cid__application_instances__app_instance_id__users__user_name__enforce_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Enforcement Request',
                allOf: [{ $ref: '#/components/schemas/EnforcementRequest' }],
                description: 'Request parameters for a permission enforcement',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EnforcementResponse' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/application_instances/{app_instance_id}/scope_resources': {
      get: {
        tags: ['resource', 'scope-resource', 'external-api', 'authorization'],
        summary: 'Get Scope Resources',
        description:
          'Get the list of scope resources that may be applied to authorization policy',
        operationId:
          'get_scope_resources_authorization_external_v1_customers__cid__application_instances__app_instance_id__scope_resources_get',
        parameters: [
          {
            description: 'The application customer identifier',
            required: true,
            schema: {
              title: 'Application Customer Id',
              type: 'string',
              description: 'The application customer identifier',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description:
              'A filter expression that matches customer resource slugs',
            required: false,
            schema: {
              title: 'Slug',
              type: 'string',
              description:
                'A filter expression that matches customer resource slugs',
            },
            name: 'slug',
            in: 'query',
          },
          {
            description:
              'A filter expression that matches customer resource names',
            required: false,
            schema: {
              title: 'Name',
              type: 'string',
              description:
                'A filter expression that matches customer resource names',
            },
            name: 'name',
            in: 'query',
          },
          {
            description: 'The type of scope resources to get',
            required: true,
            schema: {
              title: 'Type',
              type: 'string',
              description: 'The type of scope resources to get',
            },
            name: 'type',
            in: 'query',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaginatedScopeResourceList',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['resource', 'scope-resource', 'external-api', 'authorization'],
        summary: 'Delete Scope Resource',
        description:
          'Dissociates the identified scope resource from authorization policies',
        operationId:
          'delete_scope_resource_authorization_external_v1_customers__cid__application_instances__app_instance_id__scope_resources_delete',
        parameters: [
          {
            description:
              'Identifies the scope owning the resources to retrieve',
            required: true,
            schema: {
              title: 'Scope Id',
              type: 'string',
              description:
                'Identifies the scope owning the resources to retrieve',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the scope resource',
            required: true,
            schema: {
              title: 'Scope Resource Slug',
              type: 'string',
              description: 'Slug identifying the scope resource',
            },
            name: 'slug',
            in: 'query',
          },
        ],
        responses: {
          '204': { description: 'Successful Response' },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Resource not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/resources': {
      get: {
        tags: ['resource', 'external-api', 'authorization'],
        summary: 'Get User Accessible Resources',
        description:
          'Gets list of resources accessible to a user associated with a customer and application instance',
        operationId:
          'get_user_accessible_resources_authorization_external_v1_customers__cid__application_instances__app_instance_id__users__user_name__resources_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CompactResourcePolicyList',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/application_instances/{app_instance_id}/predefined_filters': {
      get: {
        tags: ['resource', 'scope-resource', 'external-api', 'authorization'],
        summary: 'Get Predefined Filters',
        description:
          "Get the application's list of predefined scope resource filters",
        operationId:
          'get_predefined_filters_authorization_external_v1_application_instances__app_instance_id__predefined_filters_get',
        parameters: [
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description:
              'The type of predefined scope resource filterss to get',
            required: true,
            schema: {
              title: 'Type',
              type: 'string',
              description:
                'The type of predefined scope resource filterss to get',
            },
            name: 'type',
            in: 'query',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BaseScopeResourceList' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/application_instances/{app_instance_id}/roles': {
      get: {
        tags: ['role', 'external-api', 'authorization'],
        summary: 'Get Customer Roles',
        description:
          "Retrieves a list of a customer's roles in a single application instances",
        operationId:
          'get_roles_authorization_external_v1_customers__cid__application_instances__app_instance_id__roles_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'An expression that matches role slugs',
            required: false,
            schema: {
              title: 'Slug',
              type: 'string',
              description: 'An expression that matches role slugs',
            },
            name: 'slug',
            in: 'query',
          },
          {
            description: 'An expression that matches role names',
            required: false,
            schema: {
              title: 'Name',
              type: 'string',
              description: 'An expression that matches role names',
            },
            name: 'name',
            in: 'query',
          },
          {
            description: 'Indicates whether or not to include predefined roles',
            required: false,
            schema: {
              title: 'Include Roles',
              type: 'boolean',
              description:
                'Indicates whether or not to include predefined roles',
              default: true,
            },
            name: 'include_predefined_roles',
            in: 'query',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaginatedRoleSummaryList',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['role', 'external-api', 'authorization'],
        summary: 'Create Role',
        description: "Creates a role in a customer's application instance",
        operationId:
          'create_role_authorization_external_v1_customers__cid__application_instances__app_instance_id__roles_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description:
              'Indicates whether or not the customer identified by {cid} is a platform customer',
            required: false,
            schema: {
              title: 'Platform Customer',
              type: 'boolean',
              description:
                'Indicates whether or not the customer identified by {cid} is a platform customer',
              default: false,
            },
            name: 'platform_cid',
            in: 'query',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Role',
                allOf: [{ $ref: '#/components/schemas/RoleCreation' }],
                description: 'The role to create',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RoleReference' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/application_instances/{app_instance_id}/roles/{role_slug}/resource_policies': {
      post: {
        tags: ['role', 'external-api', 'authorization'],
        summary: 'Assign Resources Policies to Role',
        description: 'Assigns resource policies to a role',
        operationId:
          'assign_policies_to_role_authorization_external_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__resource_policies_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role to update',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role to update',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Resource Policies',
                allOf: [{ $ref: '#/components/schemas/AssignRolePolicies' }],
                description: 'Resource policies to assign to the role',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Role not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/application_instances/{app_instance_id}/roles/{role_slug}': {
      get: {
        tags: ['role', 'external-api', 'authorization'],
        summary: 'Get Role',
        description: "Retrieves a role in a customer's application instance",
        operationId:
          'get_role_authorization_external_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role to retrieve',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role to retrieve',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Role' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Role not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      put: {
        tags: ['role', 'external-api', 'authorization'],
        summary: 'Update Role',
        description: "Updates a role in a customer's application instance",
        operationId:
          'update_role_authorization_external_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__put',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role to update',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role to update',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Role',
                allOf: [{ $ref: '#/components/schemas/RoleUpdate' }],
                description: 'Update action and list of affected resources',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Role not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['role', 'external-api', 'authorization'],
        summary: 'Delete Role',
        description: "Deletes a role in a customer's application instance",
        operationId:
          'delete_role_authorization_external_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__delete',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role to delete',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role to delete',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        responses: {
          '204': { description: 'Successful Response' },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/roles': {
      put: {
        tags: ['user', 'external-api', 'authorization'],
        summary: 'Update User Roles',
        description:
          "Updates a user's roles in a customer's application instance",
        operationId:
          'update_user_roles_authorization_external_v1_customers__cid__application_instances__app_instance_id__users__user_name__roles_put',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Roles',
                allOf: [{ $ref: '#/components/schemas/UserRoleUpdates' }],
                description: 'Update action and list of affected roles',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['user', 'external-api', 'authorization'],
        summary: 'Assign Roles to User',
        description:
          "Assigns roles in a customer's application instance to a user",
        operationId:
          'assign_roles_to_user_authorization_external_v1_customers__cid__application_instances__app_instance_id__users__user_name__roles_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Roles',
                allOf: [{ $ref: '#/components/schemas/UserRoleAssignments' }],
                description: 'Roles to assign to the user',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/application_instances/{app_instance_id}/roles/{role_slug}/users': {
      post: {
        tags: ['user', 'external-api', 'authorization'],
        summary: 'Associate Users With a Role',
        description: 'Assigns a role to many users in a single operation',
        operationId:
          'assign_role_to_users_authorization_external_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__users_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Roles',
                allOf: [{ $ref: '#/components/schemas/RoleUserAssignments' }],
                description: 'Roles to assign to the user',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/users/{user_name}/application_instances': {
      put: {
        tags: ['user', 'external-api', 'authorization'],
        summary: 'Update User Application Instances',
        description: "Updates a user's assigned application instances",
        operationId:
          'update_user_application_instances_authorization_external_v1_customers__cid__users__user_name__application_instances_put',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Application Instances',
                allOf: [
                  {
                    $ref: '#/components/schemas/UserApplicationInstanceUpdates',
                  },
                ],
                description:
                  'Update action and list of affected application instances',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['user', 'external-api', 'authorization'],
        summary: 'Assign Application Instances to User',
        description: 'Assigns application instances to a user',
        operationId:
          'assign_application_instances_to_user_authorization_external_v1_customers__cid__users__user_name__application_instances_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Application Instances',
                allOf: [
                  {
                    $ref:
                      '#/components/schemas/UserApplicationInstanceAssignments',
                  },
                ],
                description: 'Application Instances to assign to the user',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/users': {
      get: {
        tags: ['user', 'external-api', 'authorization'],
        summary: 'Get Customer Users',
        description:
          "Retrieve all authorization information for a customer's users",
        operationId:
          'get_customer_user_list_authorization_external_v1_customers__cid__users_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PaginatedUserList' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/users/{user_name}': {
      get: {
        tags: ['user', 'external-api', 'authorization'],
        summary: 'Get User',
        description:
          'Retrieve all authorization policies for all application instances for a user',
        operationId:
          'get_user_authorization_external_v1_customers__cid__users__user_name__get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/external/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}': {
      get: {
        tags: ['user', 'external-api', 'authorization'],
        summary: 'Get User Application Instance',
        description:
          'Retrieve all authorization policies for a single application instance for a user',
        operationId:
          'get_user_application_authorization_external_v1_customers__cid__application_instances__app_instance_id__users__user_name__get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserApplicationInstanceDetails',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/app/v1/status': {
      get: {
        tags: ['health', 'health-api', 'authorization'],
        summary: 'Service status check',
        description: 'Public endpoint to check service health',
        operationId: 'check_status_authorization_app_v1_status_get',
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StatusResponse' },
              },
            },
          },
          '503': {
            description: 'Service is unhealthy',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StatusResponse' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/status': {
      get: {
        tags: ['health', 'health-api', 'authorization'],
        summary: 'Service status check',
        description: 'Public endpoint to check service health',
        operationId: 'check_status_authorization_ui_v1_status_get',
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StatusResponse' },
              },
            },
          },
          '503': {
            description: 'Service is unhealthy',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StatusResponse' },
              },
            },
          },
        },
      },
    },
    '/authorization/internal/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/enforce': {
      get: {
        tags: ['enforcement', 'internal-api', 'authorization'],
        summary: 'Enforce permissions on resource',
        description:
          'Determine whether or not a subject has permission to a resource',
        operationId:
          'enforce_permission_get_authorization_internal_v1_customers__cid__application_instances__app_instance_id__users__user_name__enforce_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
          {
            description:
              'The slug or short name of the permission to test for enforcement',
            required: true,
            schema: {
              title: 'Permission Slug',
              type: 'string',
              description:
                'The slug or short name of the permission to test for enforcement',
            },
            name: 'permission',
            in: 'query',
          },
          {
            description:
              'The slug or short name of the application resource against which to test enforcement',
            required: true,
            schema: {
              title: 'Application Resource Slug',
              type: 'string',
              description:
                'The slug or short name of the application resource against which to test enforcement',
            },
            name: 'application_resource',
            in: 'query',
          },
          {
            description:
              'The slug or short name of the scope resource against which to test enforcement',
            required: false,
            schema: {
              title: 'Scope Resource Slug',
              type: 'string',
              description:
                'The slug or short name of the scope resource against which to test enforcement',
            },
            name: 'scope_resource',
            in: 'query',
          },
          {
            description:
              "The type of user's customer account, e.g. 'msp', 'tenant'",
            required: false,
            schema: {
              title: 'Account Type',
              type: 'string',
              description:
                "The type of user's customer account, e.g. 'msp', 'tenant'",
            },
            name: 'account_type',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EnforcementResponse' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['enforcement', 'internal-api', 'authorization'],
        summary: 'Enforce permissions on resource',
        description:
          'Determine whether or not a subject has permission to a resource',
        operationId:
          'enforce_permission_post_authorization_internal_v1_customers__cid__application_instances__app_instance_id__users__user_name__enforce_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Enforcement Request',
                allOf: [{ $ref: '#/components/schemas/EnforcementRequest' }],
                description: 'Request parameters for a permission enforcement',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EnforcementResponse' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/internal/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/resources': {
      get: {
        tags: ['resource', 'internal-api', 'authorization'],
        summary: 'Get User Accessible Resources',
        description:
          'Gets list of resources accessible to a user associated with a customer and application instance',
        operationId:
          'get_user_accessible_resources_authorization_internal_v1_customers__cid__application_instances__app_instance_id__users__user_name__resources_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CompactResourcePolicyList',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/application_instances/{app_instance_id}': {
      get: {
        tags: ['application-instance', 'webui-api', 'authorization'],
        summary: 'Get Application Instance',
        description:
          'Retrieve authorization metadata for an application instance',
        operationId:
          'get_all_customer_application_instance_permissions_authorization_ui_v1_application_instances__app_instance_id__get',
        parameters: [
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description:
              'Indicates whether or not to include application resource metadata in the response',
            required: false,
            schema: {
              title: 'Include Application Resources',
              type: 'boolean',
              description:
                'Indicates whether or not to include application resource metadata in the response',
              default: true,
            },
            name: 'include_application_resources',
            in: 'query',
          },
          {
            description:
              'Indicates whether or not to include global permission metadata in the response',
            required: false,
            schema: {
              title: 'Include Permissions',
              type: 'boolean',
              description:
                'Indicates whether or not to include global permission metadata in the response',
              default: true,
            },
            name: 'include_permissions',
            in: 'query',
          },
          {
            description:
              'Indicates whether or not to include predefined roles in the response',
            required: false,
            schema: {
              title: 'Include Roles',
              type: 'boolean',
              description:
                'Indicates whether or not to include predefined roles in the response',
              default: true,
            },
            name: 'include_predefined_roles',
            in: 'query',
          },
          {
            description:
              'Indicates whether or not to include scope resource metadata in the response',
            required: false,
            schema: {
              title: 'Include Scope Resources',
              type: 'boolean',
              description:
                'Indicates whether or not to include scope resource metadata in the response',
              default: true,
            },
            name: 'include_scope_resources',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApplicationInstance' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Application instance not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/enforce': {
      get: {
        tags: ['enforcement', 'webui-api', 'authorization'],
        summary: 'Enforce permissions on resource',
        description:
          'Determine whether or not a subject has permission to a resource',
        operationId:
          'enforce_permission_get_authorization_ui_v1_customers__cid__application_instances__app_instance_id__users__user_name__enforce_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
          {
            description:
              'The slug or short name of the permission to test for enforcement',
            required: true,
            schema: {
              title: 'Permission Slug',
              type: 'string',
              description:
                'The slug or short name of the permission to test for enforcement',
            },
            name: 'permission',
            in: 'query',
          },
          {
            description:
              'The slug or short name of the application resource against which to test enforcement',
            required: true,
            schema: {
              title: 'Application Resource Slug',
              type: 'string',
              description:
                'The slug or short name of the application resource against which to test enforcement',
            },
            name: 'application_resource',
            in: 'query',
          },
          {
            description:
              'The slug or short name of the scope resource against which to test enforcement',
            required: false,
            schema: {
              title: 'Scope Resource Slug',
              type: 'string',
              description:
                'The slug or short name of the scope resource against which to test enforcement',
            },
            name: 'scope_resource',
            in: 'query',
          },
          {
            description:
              "The type of user's customer account, e.g. 'msp', 'tenant'",
            required: false,
            schema: {
              title: 'Account Type',
              type: 'string',
              description:
                "The type of user's customer account, e.g. 'msp', 'tenant'",
            },
            name: 'account_type',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EnforcementResponse' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['enforcement', 'webui-api', 'authorization'],
        summary: 'Enforce permissions on resource',
        description:
          'Determine whether or not a subject has permission to a resource',
        operationId:
          'enforce_permission_post_authorization_ui_v1_customers__cid__application_instances__app_instance_id__users__user_name__enforce_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Enforcement Request',
                allOf: [{ $ref: '#/components/schemas/EnforcementRequest' }],
                description: 'Request parameters for a permission enforcement',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EnforcementResponse' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/application_instances/{app_instance_id}/scope_resources': {
      get: {
        tags: ['resource', 'scope-resource', 'webui-api', 'authorization'],
        summary: 'Get Scope Resources',
        description:
          'Get the list of scope resources that may be applied to authorization policy',
        operationId:
          'get_scope_resources_authorization_ui_v1_customers__cid__application_instances__app_instance_id__scope_resources_get',
        parameters: [
          {
            description: 'The application customer identifier',
            required: true,
            schema: {
              title: 'Application Customer Id',
              type: 'string',
              description: 'The application customer identifier',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description:
              'A filter expression that matches customer resource slugs',
            required: false,
            schema: {
              title: 'Slug',
              type: 'string',
              description:
                'A filter expression that matches customer resource slugs',
            },
            name: 'slug',
            in: 'query',
          },
          {
            description:
              'A filter expression that matches customer resource names',
            required: false,
            schema: {
              title: 'Name',
              type: 'string',
              description:
                'A filter expression that matches customer resource names',
            },
            name: 'name',
            in: 'query',
          },
          {
            description: 'The type of scope resources to get',
            required: true,
            schema: {
              title: 'Type',
              type: 'string',
              description: 'The type of scope resources to get',
            },
            name: 'type',
            in: 'query',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaginatedScopeResourceList',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['resource', 'scope-resource', 'webui-api', 'authorization'],
        summary: 'Delete Scope Resource',
        description:
          'Dissociates the identified scope resource from authorization policies',
        operationId:
          'delete_scope_resource_authorization_ui_v1_customers__cid__application_instances__app_instance_id__scope_resources_delete',
        parameters: [
          {
            description:
              'Identifies the scope owning the resources to retrieve',
            required: true,
            schema: {
              title: 'Scope Id',
              type: 'string',
              description:
                'Identifies the scope owning the resources to retrieve',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the scope resource',
            required: true,
            schema: {
              title: 'Scope Resource Slug',
              type: 'string',
              description: 'Slug identifying the scope resource',
            },
            name: 'slug',
            in: 'query',
          },
        ],
        responses: {
          '204': { description: 'Successful Response' },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Resource not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/resources': {
      get: {
        tags: ['resource', 'webui-api', 'authorization'],
        summary: 'Get User Accessible Resources',
        description:
          'Gets list of resources accessible to a user associated with a customer and application instance',
        operationId:
          'get_user_accessible_resources_authorization_ui_v1_customers__cid__application_instances__app_instance_id__users__user_name__resources_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CompactResourcePolicyList',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'User not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/application_instances/{app_instance_id}/predefined_filters': {
      get: {
        tags: ['resource', 'scope-resource', 'webui-api', 'authorization'],
        summary: 'Get Predefined Filters',
        description:
          "Get the application's list of predefined scope resource filters",
        operationId:
          'get_predefined_filters_authorization_ui_v1_application_instances__app_instance_id__predefined_filters_get',
        parameters: [
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description:
              'The type of predefined scope resource filterss to get',
            required: true,
            schema: {
              title: 'Type',
              type: 'string',
              description:
                'The type of predefined scope resource filterss to get',
            },
            name: 'type',
            in: 'query',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BaseScopeResourceList' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/application_instances/{app_instance_id}/roles': {
      get: {
        tags: ['role', 'webui-api', 'authorization'],
        summary: 'Get Customer Roles',
        description:
          "Retrieves a list of a customer's roles in a single application instances",
        operationId:
          'get_roles_authorization_ui_v1_customers__cid__application_instances__app_instance_id__roles_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'An expression that matches role slugs',
            required: false,
            schema: {
              title: 'Slug',
              type: 'string',
              description: 'An expression that matches role slugs',
            },
            name: 'slug',
            in: 'query',
          },
          {
            description: 'An expression that matches role names',
            required: false,
            schema: {
              title: 'Name',
              type: 'string',
              description: 'An expression that matches role names',
            },
            name: 'name',
            in: 'query',
          },
          {
            description: 'Indicates whether or not to include predefined roles',
            required: false,
            schema: {
              title: 'Include Roles',
              type: 'boolean',
              description:
                'Indicates whether or not to include predefined roles',
              default: true,
            },
            name: 'include_predefined_roles',
            in: 'query',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaginatedRoleSummaryList',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['role', 'webui-api', 'authorization'],
        summary: 'Create Role',
        description: "Creates a role in a customer's application instance",
        operationId:
          'create_role_authorization_ui_v1_customers__cid__application_instances__app_instance_id__roles_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description:
              'Indicates whether or not the customer identified by {cid} is a platform customer',
            required: false,
            schema: {
              title: 'Platform Customer',
              type: 'boolean',
              description:
                'Indicates whether or not the customer identified by {cid} is a platform customer',
              default: false,
            },
            name: 'platform_cid',
            in: 'query',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Role',
                allOf: [{ $ref: '#/components/schemas/RoleCreation' }],
                description: 'The role to create',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RoleReference' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/application_instances/{app_instance_id}/roles/{role_slug}/resource_policies': {
      post: {
        tags: ['role', 'webui-api', 'authorization'],
        summary: 'Assign Resources Policies to Role',
        description: 'Assigns resource policies to a role',
        operationId:
          'assign_policies_to_role_authorization_ui_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__resource_policies_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role to update',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role to update',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Resource Policies',
                allOf: [{ $ref: '#/components/schemas/AssignRolePolicies' }],
                description: 'Resource policies to assign to the role',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Role not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/application_instances/{app_instance_id}/roles/{role_slug}': {
      get: {
        tags: ['role', 'webui-api', 'authorization'],
        summary: 'Get Role',
        description: "Retrieves a role in a customer's application instance",
        operationId:
          'get_role_authorization_ui_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role to retrieve',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role to retrieve',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Role' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Role not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      put: {
        tags: ['role', 'webui-api', 'authorization'],
        summary: 'Update Role',
        description: "Updates a role in a customer's application instance",
        operationId:
          'update_role_authorization_ui_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__put',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role to update',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role to update',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Role',
                allOf: [{ $ref: '#/components/schemas/RoleUpdate' }],
                description: 'Update action and list of affected resources',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Role not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['role', 'webui-api', 'authorization'],
        summary: 'Delete Role',
        description: "Deletes a role in a customer's application instance",
        operationId:
          'delete_role_authorization_ui_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__delete',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role to delete',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role to delete',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        responses: {
          '204': { description: 'Successful Response' },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}/roles': {
      put: {
        tags: ['user', 'webui-api', 'authorization'],
        summary: 'Update User Roles',
        description:
          "Updates a user's roles in a customer's application instance",
        operationId:
          'update_user_roles_authorization_ui_v1_customers__cid__application_instances__app_instance_id__users__user_name__roles_put',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Roles',
                allOf: [{ $ref: '#/components/schemas/UserRoleUpdates' }],
                description: 'Update action and list of affected roles',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['user', 'webui-api', 'authorization'],
        summary: 'Assign Roles to User',
        description:
          "Assigns roles in a customer's application instance to a user",
        operationId:
          'assign_roles_to_user_authorization_ui_v1_customers__cid__application_instances__app_instance_id__users__user_name__roles_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Roles',
                allOf: [{ $ref: '#/components/schemas/UserRoleAssignments' }],
                description: 'Roles to assign to the user',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/application_instances/{app_instance_id}/roles/{role_slug}/users': {
      post: {
        tags: ['user', 'webui-api', 'authorization'],
        summary: 'Associate Users With a Role',
        description: 'Assigns a role to many users in a single operation',
        operationId:
          'assign_role_to_users_authorization_ui_v1_customers__cid__application_instances__app_instance_id__roles__role_slug__users_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Slug identifying the role',
            required: true,
            schema: {
              title: 'Role Slug',
              type: 'string',
              description: 'Slug identifying the role',
            },
            name: 'role_slug',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Roles',
                allOf: [{ $ref: '#/components/schemas/RoleUserAssignments' }],
                description: 'Roles to assign to the user',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/users/{user_name}/application_instances': {
      put: {
        tags: ['user', 'webui-api', 'authorization'],
        summary: 'Update User Application Instances',
        description: "Updates a user's assigned application instances",
        operationId:
          'update_user_application_instances_authorization_ui_v1_customers__cid__users__user_name__application_instances_put',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Application Instances',
                allOf: [
                  {
                    $ref: '#/components/schemas/UserApplicationInstanceUpdates',
                  },
                ],
                description:
                  'Update action and list of affected application instances',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
      post: {
        tags: ['user', 'webui-api', 'authorization'],
        summary: 'Assign Application Instances to User',
        description: 'Assigns application instances to a user',
        operationId:
          'assign_application_instances_to_user_authorization_ui_v1_customers__cid__users__user_name__application_instances_post',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'Application Instances',
                allOf: [
                  {
                    $ref:
                      '#/components/schemas/UserApplicationInstanceAssignments',
                  },
                ],
                description: 'Application Instances to assign to the user',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Successful Response',
            content: { 'application/json': { schema: {} } },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/users': {
      get: {
        tags: ['user', 'webui-api', 'authorization'],
        summary: 'Get Customer Users',
        description:
          "Retrieve all authorization information for a customer's users",
        operationId:
          'get_customer_user_list_authorization_ui_v1_customers__cid__users_get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'The maximum number of items to retrieve',
            required: false,
            schema: {
              title: 'Limit',
              maximum: 2000.0,
              minimum: 1.0,
              type: 'integer',
              description: 'The maximum number of items to retrieve',
              default: 2000,
            },
            name: 'limit',
            in: 'query',
          },
          {
            description:
              'The starting offset from which to begin retrieving items',
            required: false,
            schema: {
              title: 'Offset',
              minimum: 0.0,
              type: 'integer',
              description:
                'The starting offset from which to begin retrieving items',
              default: 0,
            },
            name: 'offset',
            in: 'query',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PaginatedUserList' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/users/{user_name}': {
      get: {
        tags: ['user', 'webui-api', 'authorization'],
        summary: 'Get User',
        description:
          'Retrieve all authorization policies for all application instances for a user',
        operationId:
          'get_user_authorization_ui_v1_customers__cid__users__user_name__get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
    '/authorization/ui/v1/customers/{cid}/application_instances/{app_instance_id}/users/{user_name}': {
      get: {
        tags: ['user', 'webui-api', 'authorization'],
        summary: 'Get User Application Instance',
        description:
          'Retrieve all authorization policies for a single application instance for a user',
        operationId:
          'get_user_application_authorization_ui_v1_customers__cid__application_instances__app_instance_id__users__user_name__get',
        parameters: [
          {
            description: 'Identifies the customer',
            required: true,
            schema: {
              title: 'Customer Id',
              type: 'string',
              description: 'Identifies the customer',
            },
            name: 'cid',
            in: 'path',
          },
          {
            description: 'Unique identifier of the application instance',
            required: true,
            schema: {
              title: 'Application Instance ID',
              type: 'string',
              description: 'Unique identifier of the application instance',
            },
            name: 'app_instance_id',
            in: 'path',
          },
          {
            description: 'Identifies the user',
            required: true,
            schema: {
              title: 'User Name',
              type: 'string',
              description: 'Identifies the user',
            },
            name: 'user_name',
            in: 'path',
          },
        ],
        responses: {
          '200': {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserApplicationInstanceDetails',
                },
              },
            },
          },
          '400': { description: 'Bad request' },
          '401': { description: 'The operation cannot be authorized' },
          '403': { description: 'The operation is forbidden' },
          '405': { description: 'The method is not allowed on this path' },
          '404': { description: 'Not found' },
          '422': {
            description: 'Validation Error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HTTPValidationError' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      AddDeleteOperation: {
        title: 'AddDeleteOperation',
        enum: ['ADD', 'DELETE'],
        type: 'string',
        description: 'An enumeration.',
      },
      ApplicationInstance: {
        title: 'ApplicationInstance',
        required: ['application_instance_id', 'application_id'],
        type: 'object',
        properties: {
          application_instance_id: {
            title: 'Application Instance Id',
            type: 'string',
            description: 'The application instance unique identifier',
          },
          application_id: {
            title: 'Application Id',
            type: 'string',
            description: "The application's unique identifier",
          },
          permissions: {
            title: 'Permissions',
            type: 'array',
            items: { $ref: '#/components/schemas/Permission' },
            description: "The application's global permissions",
          },
          application_resources: {
            title: 'Application Resources',
            type: 'array',
            items: {
              $ref: '#/components/schemas/ApplicationResourcePermissions',
            },
            description: "The application's static resources",
          },
          scope_resources: {
            title: 'Scope Resources',
            type: 'array',
            items: { $ref: '#/components/schemas/ScopeResourceType' },
            description: "The application's dynamic scope resources",
          },
          roles: {
            title: 'Roles',
            type: 'array',
            items: { $ref: '#/components/schemas/Role' },
            description: "The application's predefined roles",
          },
        },
        description: 'The authorization metadata for an application instance',
      },
      ApplicationInstanceReference: {
        title: 'ApplicationInstanceReference',
        required: ['application_instance_id'],
        type: 'object',
        properties: {
          application_instance_id: {
            title: 'Application Instance Id',
            type: 'string',
            description: 'The application instance unique identifier',
          },
        },
        description: 'Identifies an application instance',
      },
      ApplicationRegistration: {
        title: 'ApplicationRegistration',
        required: [
          'application_id',
          'application_slug',
          'broker_url',
          'permissions',
          'application_resources',
          'scope_resources',
          'roles',
        ],
        type: 'object',
        properties: {
          application_id: {
            title: 'Application Id',
            type: 'string',
            description: "The application's unique identifier",
          },
          application_slug: {
            title: 'Application Slug',
            type: 'string',
            description: 'The slug or short name identifying the application',
          },
          broker_url: {
            title: 'Broker URL',
            maxLength: 65536,
            minLength: 1,
            type: 'string',
            description: "The application's broker endpoint",
            format: 'uri',
          },
          permissions: {
            title: 'Permissions',
            type: 'array',
            items: { $ref: '#/components/schemas/Permission' },
            description: "The application's global permissions",
          },
          application_resources: {
            title: 'Application Resources',
            type: 'array',
            items: {
              $ref: '#/components/schemas/ApplicationResourcePermissions',
            },
            description: "The application's static resources",
          },
          scope_resources: {
            title: 'Scope Resources',
            type: 'array',
            items: { $ref: '#/components/schemas/ScopeResourceType' },
            description: "The application's dynamic scope resources",
          },
          roles: {
            title: 'Roles',
            type: 'array',
            items: { $ref: '#/components/schemas/Role' },
            description: "The application's predefined roles",
          },
        },
        description: 'A request to register an application instance with Authz',
      },
      ApplicationResourcePermissions: {
        title: 'ApplicationResourcePermissions',
        required: ['name', 'slug', 'permissions'],
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string',
            description: 'The resource name',
          },
          slug: {
            title: 'Slug',
            type: 'string',
            description: 'A slug or abbreviated name for the resource',
          },
          description: {
            title: 'Description',
            type: 'string',
            description: 'A longer text description of the resource',
          },
          tags: {
            title: 'Tags',
            type: 'array',
            items: { type: 'string' },
            description: 'Tag values to associate with the resource',
          },
          account_types: {
            title: 'Account Types',
            type: 'array',
            items: { type: 'string' },
            description:
              "All customer account types that may access the application resource, e.g. 'msp', 'tenant'",
          },
          permissions: {
            title: 'Permissions',
            type: 'array',
            items: { $ref: '#/components/schemas/Permission' },
            description: 'All permissions allowed for the resource',
          },
          default_permissions: {
            title: 'Default Permissions',
            type: 'array',
            items: { $ref: '#/components/schemas/PermissionReference' },
            description: 'Default permissions when building a role in the UI',
          },
        },
        description:
          'An application resource and the permissions that may be associated with it',
      },
      ApplicationResourceUpgrade: {
        title: 'ApplicationResourceUpgrade',
        required: ['add'],
        type: 'object',
        properties: {
          add: {
            title: 'Add',
            type: 'array',
            items: {
              $ref: '#/components/schemas/ApplicationResourcePermissions',
            },
            description: 'A list of application resources to add',
          },
        },
        description:
          'An application resource upgrade specification.\nThe only operation permitted at this time is adding new resources.',
      },
      ApplicationUpgrade: {
        title: 'ApplicationUpgrade',
        type: 'object',
        properties: {
          broker_url: {
            title: 'Broker URL',
            maxLength: 65536,
            minLength: 1,
            type: 'string',
            description:
              "The application's broker endpoint. Required only if it's changed since onboarding or the last upgrade.",
            format: 'uri',
          },
          permissions: {
            title: 'Permissions',
            allOf: [{ $ref: '#/components/schemas/PermissionUpgrade' }],
            description: "The application's permission upgrade specification",
          },
          application_resources: {
            title: 'Application Resources',
            allOf: [
              { $ref: '#/components/schemas/ApplicationResourceUpgrade' },
            ],
            description:
              "The application's static resource upgrade specification",
          },
          scope_resources: {
            title: 'Scope Resources',
            allOf: [{ $ref: '#/components/schemas/ScopeResourceUpgrade' }],
            description:
              "The application's dynamic scope resource upgrade specification",
          },
          roles: {
            title: 'Roles',
            allOf: [{ $ref: '#/components/schemas/RoleUpgrade' }],
            description:
              "The application's predefined role upgrade specification",
          },
        },
        description:
          'A request to upgrade an application already registered with Authz',
      },
      AssignRolePolicies: {
        title: 'AssignRolePolicies',
        required: ['resource_policies'],
        type: 'object',
        properties: {
          resource_policies: {
            title: 'Policies',
            type: 'array',
            items: { $ref: '#/components/schemas/ResourcePolicy' },
            description: 'List of the resource policies to assign to the role',
          },
        },
        description: 'Request to assign resource policies to a role',
      },
      BaseScopeResourceList: {
        title: 'BaseScopeResourceList',
        required: ['scope_resources'],
        type: 'object',
        properties: {
          scope_resources: {
            title: 'Scope Resources',
            type: 'array',
            items: { $ref: '#/components/schemas/ScopeResource' },
            description: 'The list of scope resources',
          },
        },
        description:
          'Base for other models that must include a list of scope resources',
      },
      CompactResourcePolicy: {
        title: 'CompactResourcePolicy',
        required: ['resource', 'permissions', 'effect'],
        type: 'object',
        properties: {
          resource: {
            title: 'Resource Matcher',
            type: 'string',
            description: 'The matcher identifying one or more resources',
          },
          permissions: {
            title: 'Permission Slugs',
            type: 'array',
            items: { type: 'string' },
            description:
              'The slugs or short names of the permissions granted to the resource',
          },
          effect: {
            title: 'Effect',
            allOf: [{ $ref: '#/components/schemas/Effect' }],
            description: 'The permission effect',
          },
        },
        description:
          'Compact representation of an authorization policy for a resource matcher',
      },
      CompactResourcePolicyList: {
        title: 'CompactResourcePolicyList',
        required: ['resources'],
        type: 'object',
        properties: {
          resources: {
            title: 'Resources',
            type: 'array',
            items: { $ref: '#/components/schemas/CompactResourcePolicy' },
            description: 'List of resource policies',
          },
        },
        description:
          'A list of resource policies in their compact representation',
      },
      Effect: {
        title: 'Effect',
        enum: ['ALLOW', 'DENY'],
        type: 'string',
        description:
          'The effect, whether to allow or deny, permissions on resources',
      },
      EnforcementRequest: {
        title: 'EnforcementRequest',
        required: ['permission', 'application_resource'],
        type: 'object',
        properties: {
          permission: {
            title: 'Permission Slug',
            type: 'string',
            description:
              'The slug or short name of the permission to test for enforcement',
          },
          application_resource: {
            title: 'Application Resource Slug',
            type: 'string',
            description:
              'The slug or short name of the application resource against which to test enforcement',
          },
          scope_resource: {
            title: 'Scope Resource Slug',
            type: 'string',
            description:
              'The slug or short name of the scope resource against which to test enforcement',
          },
          account_type: {
            title: 'Account Type',
            type: 'string',
            description:
              "The type of user's customer account, e.g. 'msp', 'tenant'",
          },
        },
        description: 'A resource access enforcement request',
      },
      EnforcementResponse: {
        title: 'EnforcementResponse',
        required: ['effect'],
        type: 'object',
        properties: {
          effect: {
            title: 'Effect',
            allOf: [{ $ref: '#/components/schemas/Effect' }],
            description:
              "The effect, 'ALLOW' or 'DENY', of the permission on the resource for the user",
          },
        },
        description: 'A resource access enforcement response',
      },
      HTTPValidationError: {
        title: 'HTTPValidationError',
        type: 'object',
        properties: {
          detail: {
            title: 'Detail',
            type: 'array',
            items: { $ref: '#/components/schemas/ValidationError' },
          },
        },
      },
      PaginatedRoleSummaryList: {
        title: 'PaginatedRoleSummaryList',
        required: ['roles'],
        type: 'object',
        properties: {
          roles: {
            title: 'Roles',
            type: 'array',
            items: { $ref: '#/components/schemas/RoleSummary' },
            description: 'The list of role summaries',
          },
          pagination: {
            title: 'Pagination',
            allOf: [{ $ref: '#/components/schemas/Pagination' }],
            description: 'Pagination information for the role summary list',
            default: { offset: 0, count_per_page: 2000, total_count: 0 },
          },
        },
        description: 'A paginated list of role summaries',
      },
      PaginatedScopeResourceList: {
        title: 'PaginatedScopeResourceList',
        required: ['scope_resources'],
        type: 'object',
        properties: {
          scope_resources: {
            title: 'Scope Resources',
            type: 'array',
            items: { $ref: '#/components/schemas/ScopeResource' },
            description: 'The list of scope resources',
          },
          pagination: {
            title: 'Pagnation',
            allOf: [{ $ref: '#/components/schemas/Pagination' }],
            description: 'Pagination information for the scope resource list',
            default: { offset: 0, count_per_page: 2000, total_count: 0 },
          },
        },
        description: 'A paginated list of scope resources',
      },
      PaginatedUserList: {
        title: 'PaginatedUserList',
        required: ['users'],
        type: 'object',
        properties: {
          users: {
            title: 'Users',
            type: 'array',
            items: { $ref: '#/components/schemas/User' },
            description: 'The user list',
          },
          pagination: {
            title: 'Pagnation',
            allOf: [{ $ref: '#/components/schemas/Pagination' }],
            description: 'Pagination information for the user list',
            default: { offset: 0, count_per_page: 2000, total_count: 0 },
          },
        },
        description:
          'Paginated list of users and their role assignments across all application instances',
      },
      Pagination: {
        title: 'Pagination',
        type: 'object',
        properties: {
          offset: {
            title: 'Offset',
            type: 'integer',
            description: 'Starting offset of the page',
            default: 0,
          },
          count_per_page: {
            title: 'Count Per Page',
            type: 'integer',
            description: 'Number of items returned on each page',
            default: 2000,
          },
          total_count: {
            title: 'Total Count',
            type: 'integer',
            description: 'Total number of items',
            default: 0,
          },
        },
      },
      Permission: {
        title: 'Permission',
        required: ['name', 'slug'],
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string',
            description: 'The permission name',
          },
          slug: {
            title: 'Slug',
            type: 'string',
            description: 'A slug or abbreviated name for the permission',
          },
          description: {
            title: 'Description',
            type: 'string',
            description: 'A longer text description of the permission',
          },
        },
        description: 'An application global permission',
      },
      PermissionReference: {
        title: 'PermissionReference',
        required: ['slug'],
        type: 'object',
        properties: {
          slug: {
            title: 'Slug',
            type: 'string',
            description: 'A slug or abbreviated name for the permission',
          },
        },
        description: 'Identifies a permission',
      },
      PermissionUpgrade: {
        title: 'PermissionUpgrade',
        required: ['add'],
        type: 'object',
        properties: {
          add: {
            title: 'Add',
            type: 'array',
            items: { $ref: '#/components/schemas/Permission' },
            description: 'The list of permissions to add',
          },
        },
        description:
          'A permission upgrade specification.\nThe only operation permitted at this time is adding new permissions.',
      },
      RegistrationError: {
        title: 'RegistrationError',
        required: ['error_type', 'message'],
        type: 'object',
        properties: {
          error_type: {
            title: 'Error Type',
            allOf: [{ $ref: '#/components/schemas/RegistrationErrorType' }],
            description:
              'The type of error or the type of the entity to which the error applies',
          },
          item_id: {
            title: 'Entity Id',
            type: 'string',
            description:
              'The Id of the item (permission, role, etc.) causing the error, if applicable',
          },
          message: {
            title: 'Message',
            type: 'string',
            description: 'The error message',
          },
        },
        description: 'Details abount an application registration error',
      },
      RegistrationErrorList: {
        title: 'RegistrationErrorList',
        type: 'object',
        properties: {
          errors: {
            title: 'Errors',
            type: 'array',
            items: { $ref: '#/components/schemas/RegistrationError' },
            description: 'List of processing errors if any',
          },
        },
        description: 'The errors encountered during application registration',
      },
      RegistrationErrorType: {
        title: 'RegistrationErrorType',
        enum: [
          'SYSTEM',
          'PERMISSION',
          'ROLE',
          'APP_RESOURCE',
          'SCOPE_RESOURCE',
        ],
        type: 'string',
        description: 'The type of application registration error',
      },
      ResourceMatcher: {
        title: 'ResourceMatcher',
        required: ['matcher'],
        type: 'object',
        properties: {
          matcher: {
            title: 'Matcher',
            type: 'string',
            description: 'An expression that matches resource slugs',
          },
        },
        description: 'Matches one or more resources using a pattern',
      },
      ResourcePolicy: {
        title: 'ResourcePolicy',
        required: ['resource', 'permissions'],
        type: 'object',
        properties: {
          resource: {
            title: 'Resource Matcher',
            allOf: [{ $ref: '#/components/schemas/ResourceMatcher' }],
            description:
              'A pattern matching the slug identifiers of one or more resources',
          },
          permissions: {
            title: 'Permissions',
            type: 'array',
            items: { $ref: '#/components/schemas/PermissionReference' },
            description:
              'The permissions associated with the matched resources',
          },
          effect: {
            title: 'Effect',
            allOf: [{ $ref: '#/components/schemas/Effect' }],
            description:
              "The effect of the permissions on the resource, e.g. 'allow', 'deny'. Not all applications will use this feature.",
          },
        },
      },
      ResourcePolicyUpdate: {
        title: 'ResourcePolicyUpdate',
        required: ['operation', 'resource'],
        type: 'object',
        properties: {
          operation: {
            title: 'Operation',
            allOf: [{ $ref: '#/components/schemas/UpdateOperation' }],
            description:
              'The update operation to apply to the resource policy\nADD - adds the resource policy\nDELETE - deletes the resource policy\nREPLACE - replaces the permission for an existing resource policy',
          },
          resource: {
            title: 'Resource Matcher',
            allOf: [{ $ref: '#/components/schemas/ResourceMatcher' }],
            description:
              'A pattern matching the slug identifiers of one or more resources',
          },
          permissions: {
            title: 'Permissions',
            type: 'array',
            items: { $ref: '#/components/schemas/PermissionReference' },
            description:
              'The permissions associated with the matched resources. May be omitted for DELETE, but is required for ADD and REPLACE.',
          },
          effect: {
            title: 'Effect',
            allOf: [{ $ref: '#/components/schemas/Effect' }],
            description:
              "The effect of the permissions on the resource, e.g. 'allow', 'deny'. Not all applications will use this feature.",
          },
        },
      },
      Role: {
        title: 'Role',
        required: ['name', 'resource_policies', 'slug'],
        type: 'object',
        properties: {
          name: { title: 'Name', type: 'string', description: 'The role name' },
          description: {
            title: 'Description',
            type: 'string',
            description: 'A longer text description of the role',
          },
          resource_policies: {
            title: 'Policies',
            type: 'array',
            items: { $ref: '#/components/schemas/ResourcePolicy' },
            description: 'List of resource policies',
          },
          slug: {
            title: 'Name',
            type: 'string',
            description: 'The slug or short name for the role',
          },
        },
        description:
          'A role is a container of permission grants to resources that can be assigned to users as a unit.\nThis is the complete role definition including its slug.',
      },
      RoleCreation: {
        title: 'RoleCreation',
        required: ['name', 'resource_policies'],
        type: 'object',
        properties: {
          name: { title: 'Name', type: 'string', description: 'The role name' },
          description: {
            title: 'Description',
            type: 'string',
            description: 'A longer text description of the role',
          },
          resource_policies: {
            title: 'Policies',
            type: 'array',
            items: { $ref: '#/components/schemas/ResourcePolicy' },
            description: 'List of resource policies',
          },
        },
        description:
          'A role is a container of permission grants to resources that can be assigned to users as a unit.\nThis is the structure to create a role.  It does not contain the role slug.  The client\ncannot specify the slug for a role.  It is assigned by the Authentication service.',
      },
      RoleItemUpgrade: {
        title: 'RoleItemUpgrade',
        required: ['slug'],
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string',
            description: 'Sets the role name',
          },
          description: {
            title: 'Description',
            type: 'string',
            description: 'Sets the role description',
          },
          resource_policies: {
            title: 'Policies',
            type: 'array',
            items: { $ref: '#/components/schemas/ResourcePolicyUpdate' },
            description: 'List of resource policy updates to apply to the role',
          },
          slug: {
            title: 'Slug',
            type: 'string',
            description:
              'The slug or short name identifying the role to be updated',
          },
        },
        description:
          "A specification to upgrade an existing role.\nThe role is identified by slug.  The role's name and description may be optionally changed.\nPolicies may be added, deleted and replaced in the role.",
      },
      RoleReference: {
        title: 'RoleReference',
        required: ['slug'],
        type: 'object',
        properties: {
          slug: {
            title: 'Name',
            type: 'string',
            description: 'The slug or short name for the role',
          },
        },
        description: 'Identifies a role',
      },
      RoleSummary: {
        title: 'RoleSummary',
        required: ['name', 'slug', 'app_instance_id', 'users'],
        type: 'object',
        properties: {
          name: { title: 'Name', type: 'string', description: 'The role name' },
          slug: {
            title: 'Slug',
            type: 'string',
            description: 'The slug or short name for the role',
          },
          description: {
            title: 'Description',
            type: 'string',
            description: 'A longer text description of the role',
          },
          predefined: {
            title: 'Predefined',
            type: 'boolean',
            description:
              'Indicates whether or not this is an application predefined role',
            default: false,
          },
          app_instance_id: {
            title: 'Application Instance Id',
            type: 'string',
            description: 'The application instance unique identifier',
          },
          users: {
            title: 'Users',
            type: 'array',
            items: { type: 'string' },
            description:
              'The list of users that have been assigned this role in the identified application instance',
          },
        },
        description:
          "Summarizes a customer's use of a role in an application instance",
      },
      RoleUpdate: {
        title: 'RoleUpdate',
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string',
            description: 'Sets the role name',
          },
          description: {
            title: 'Description',
            type: 'string',
            description: 'Sets the role description',
          },
          resource_policies: {
            title: 'Policies',
            type: 'array',
            items: { $ref: '#/components/schemas/ResourcePolicyUpdate' },
            description: 'List of resource policy updates to apply to the role',
          },
        },
        description:
          "Request to update a role, including bulk update a role's resource policies.",
      },
      RoleUpgrade: {
        title: 'RoleUpgrade',
        type: 'object',
        properties: {
          add: {
            title: 'Add',
            type: 'array',
            items: { $ref: '#/components/schemas/Role' },
            description: 'A list of roles to add',
          },
          update: {
            title: 'Update',
            type: 'array',
            items: { $ref: '#/components/schemas/RoleItemUpgrade' },
            description: 'A list of role update specifiers',
          },
        },
        description:
          'A role upgrade specification.\nNew roles may be added or existing roles updated.  Existing roles are identified by slug.',
      },
      RoleUserAssignments: {
        title: 'RoleUserAssignments',
        required: ['user_names'],
        type: 'object',
        properties: {
          scope_resources: {
            title: 'Scopes',
            type: 'array',
            items: { $ref: '#/components/schemas/ResourceMatcher' },
            description:
              'The scope resources to which the role policies shall apply',
          },
          user_names: {
            title: 'User Names',
            type: 'array',
            items: { type: 'string' },
            description: 'The user names to associate with the role',
          },
        },
        description: 'List of users to associate with a role',
      },
      ScopeResource: {
        title: 'ScopeResource',
        required: ['name', 'slug'],
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string',
            description: 'The resource name',
          },
          slug: {
            title: 'Slug',
            type: 'string',
            description: 'A slug or abbreviated name for the resource',
          },
          description: {
            title: 'Description',
            type: 'string',
            description: 'A longer text description of the resource',
          },
        },
        description: 'A scope resource instance',
      },
      ScopeResourceType: {
        title: 'ScopeResourceType',
        required: ['name', 'slug'],
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string',
            description: 'The resource name',
          },
          slug: {
            title: 'Slug',
            type: 'string',
            description: 'A slug or abbreviated name for the resource',
          },
          description: {
            title: 'Description',
            type: 'string',
            description: 'A longer text description of the resource',
          },
          tags: {
            title: 'Tags',
            type: 'array',
            items: { type: 'string' },
            description: 'Tag values to associate with the resource',
          },
        },
        description: 'A scope resource type',
      },
      ScopeResourceUpgrade: {
        title: 'ScopeResourceUpgrade',
        required: ['add'],
        type: 'object',
        properties: {
          add: {
            title: 'Add',
            type: 'array',
            items: { $ref: '#/components/schemas/ScopeResourceType' },
            description: 'A list of scope resources to add',
          },
        },
        description:
          'A scope resource upgrade specification.\nThe only operation permitted at this time is adding new resources.',
      },
      Status: {
        title: 'Status',
        enum: ['HEALTHY', 'UNHEALTHY'],
        type: 'string',
        description:
          'Service status enumeration can indicate whether service is healthy or unhealthy',
      },
      StatusResponse: {
        title: 'StatusResponse',
        required: ['status', 'summary'],
        type: 'object',
        properties: {
          status: {
            title: 'Status',
            allOf: [{ $ref: '#/components/schemas/Status' }],
            description: 'The service status',
          },
          summary: {
            title: 'Summary',
            type: 'string',
            description: 'Extra information about the service status',
          },
        },
        description: 'Response from the service status endpoint',
      },
      UpdateOperation: {
        title: 'UpdateOperation',
        enum: ['ADD', 'DELETE', 'REPLACE'],
        type: 'string',
        description: 'An enumeration.',
      },
      User: {
        title: 'User',
        required: ['name', 'application_instances'],
        type: 'object',
        properties: {
          name: { title: 'Name', type: 'string', description: 'The user name' },
          application_instances: {
            title: 'Application Instances',
            type: 'array',
            items: { $ref: '#/components/schemas/UserApplicationInstance' },
            description:
              'The application instances assigned to the user, including the roles and resources granted the user',
          },
        },
        description:
          "All of a user's authorization policies across all application instances",
      },
      UserApplicationInstance: {
        title: 'UserApplicationInstance',
        required: ['application_instance', 'roles'],
        type: 'object',
        properties: {
          application_instance: {
            title: 'Application Instance',
            allOf: [
              { $ref: '#/components/schemas/ApplicationInstanceReference' },
            ],
            description: 'The application instance',
          },
          roles: {
            title: 'Roles',
            type: 'array',
            items: { $ref: '#/components/schemas/UserRoleAssignment' },
            description:
              'The roles assigned to the user in this application instance',
          },
        },
        description:
          'All authorization policies assigned to a user in an application instance',
      },
      UserApplicationInstanceAssignment: {
        title: 'UserApplicationInstanceAssignment',
        required: ['application_instance', 'roles'],
        type: 'object',
        properties: {
          application_instance: {
            title: 'Application Instance',
            allOf: [
              { $ref: '#/components/schemas/ApplicationInstanceReference' },
            ],
            description: 'The application instance',
          },
          roles: {
            title: 'Roles',
            type: 'array',
            items: { $ref: '#/components/schemas/UserRoleAssignment' },
            description:
              'The roles to assign to the user in this application instance',
          },
        },
        description:
          'Authorization policies to be assigned to a user in an application instance',
      },
      UserApplicationInstanceAssignments: {
        title: 'UserApplicationInstanceAssignments',
        required: ['application_instances'],
        type: 'object',
        properties: {
          application_instances: {
            title: 'Application Instances',
            type: 'array',
            items: {
              $ref: '#/components/schemas/UserApplicationInstanceAssignment',
            },
            description: 'The application instances to assign to the user',
          },
        },
        description:
          'List of application instances and authorization policies for each to assign to a user',
      },
      UserApplicationInstanceDetails: {
        title: 'UserApplicationInstanceDetails',
        required: ['application_instance', 'roles'],
        type: 'object',
        properties: {
          application_instance: {
            title: 'Application Instance',
            allOf: [
              { $ref: '#/components/schemas/ApplicationInstanceReference' },
            ],
            description: 'The application instance',
          },
          roles: {
            title: 'Roles',
            type: 'array',
            items: { $ref: '#/components/schemas/UserRoleAssignmentDetails' },
            description:
              'The roles assigned to the user in this application instance',
          },
        },
        description:
          'All authorization policies assigned to a user in an application instance\nincluding details for each policy.',
      },
      UserApplicationInstanceUpdate: {
        title: 'UserApplicationInstanceUpdate',
        required: ['operation', 'application_instance'],
        type: 'object',
        properties: {
          operation: {
            title: 'Operation',
            allOf: [{ $ref: '#/components/schemas/AddDeleteOperation' }],
            description:
              'The update operation to apply to the user with regards to the identified application\nADD - adds the application to the user\nDELETE - deletes the application from the user',
          },
          application_instance: {
            title: 'Application Instance',
            allOf: [
              { $ref: '#/components/schemas/ApplicationInstanceReference' },
            ],
            description: 'The application instance',
          },
          roles: {
            title: 'Roles',
            type: 'array',
            items: { $ref: '#/components/schemas/UserRoleAssignment' },
            description:
              'The roles to assign to the user in this application instance. May be omitted for DELETE, but is required for ADD.',
          },
        },
        description:
          'Authorization policies to be updated for a user in an application instance',
      },
      UserApplicationInstanceUpdates: {
        title: 'UserApplicationInstanceUpdates',
        required: ['application_instances'],
        type: 'object',
        properties: {
          application_instances: {
            title: 'Application Instances',
            type: 'array',
            items: {
              $ref: '#/components/schemas/UserApplicationInstanceUpdate',
            },
            description:
              'The application instances to replace, modify or delete from the user',
          },
        },
        description:
          'List of application instances and authorization policies for each to update for a user',
      },
      UserRoleAssignment: {
        title: 'UserRoleAssignment',
        required: ['role'],
        type: 'object',
        properties: {
          role: {
            title: 'Role',
            allOf: [{ $ref: '#/components/schemas/RoleReference' }],
            description: 'Identifies a role',
          },
          scope_resources: {
            title: 'Scopes',
            type: 'array',
            items: { $ref: '#/components/schemas/ResourceMatcher' },
            description:
              'The scope resources to which the role policies shall apply',
          },
        },
        description:
          'A user role assignment\nIdentifies a role to assign to a user along with the optional scope resources\nto apply to the role policies.',
      },
      UserRoleAssignmentDetails: {
        title: 'UserRoleAssignmentDetails',
        required: ['role'],
        type: 'object',
        properties: {
          role: {
            title: 'Role',
            allOf: [{ $ref: '#/components/schemas/Role' }],
            description: 'The role',
          },
          scope_resources: {
            title: 'Scopes',
            type: 'array',
            items: { $ref: '#/components/schemas/ResourceMatcher' },
            description:
              'The scope resources to which the role policies shall apply',
          },
        },
        description:
          'A user role assignment\nContains the complete definition of a role assigned to a user\nalong with the optional scope resources to apply to the role policies.',
      },
      UserRoleAssignments: {
        title: 'UserRoleAssignments',
        required: ['roles'],
        type: 'object',
        properties: {
          roles: {
            title: 'Roles',
            type: 'array',
            items: { $ref: '#/components/schemas/UserRoleAssignment' },
            description: 'The roles to assign to the user',
          },
        },
        description: 'List of roles to assign to a user',
      },
      UserRoleUpdate: {
        title: 'UserRoleUpdate',
        required: ['role', 'operation'],
        type: 'object',
        properties: {
          role: {
            title: 'Role',
            allOf: [{ $ref: '#/components/schemas/RoleReference' }],
            description: 'Identifies a role',
          },
          scope_resources: {
            title: 'Scopes',
            type: 'array',
            items: { $ref: '#/components/schemas/ResourceMatcher' },
            description:
              'The scope resources to which the role policies shall apply',
          },
          operation: {
            title: 'Operation',
            allOf: [{ $ref: '#/components/schemas/AddDeleteOperation' }],
            description:
              'The update operation to apply to the user with regards to the identified role\nADD - adds the role to the user\nDELETE - deletes the role from the user',
          },
        },
        description: 'An update operation on a role assignment to a user',
      },
      UserRoleUpdates: {
        title: 'UserRoleUpdates',
        required: ['roles'],
        type: 'object',
        properties: {
          roles: {
            title: 'Roles',
            type: 'array',
            items: { $ref: '#/components/schemas/UserRoleUpdate' },
            description: 'List of roles to update on the user',
          },
        },
        description:
          'A list of update operations on role assignments to a user',
      },
      ValidationError: {
        title: 'ValidationError',
        required: ['loc', 'msg', 'type'],
        type: 'object',
        properties: {
          loc: { title: 'Location', type: 'array', items: { type: 'string' } },
          msg: { title: 'Message', type: 'string' },
          type: { title: 'Error Type', type: 'string' },
        },
      },
    },
  },
  'x-tagGroups': [
    { name: 'Authz Application Facing API', tags: ['app-instance-api'] },
    { name: 'Authz External Facing API', tags: ['external-api'] },
    { name: 'Authz Internal Facing API', tags: ['internal-api'] },
    { name: 'Authz Web Client Facing API', tags: ['webui-api'] },
    { name: 'Authz App Broker API', tags: ['broker-api'] },
    { name: 'Authz Service Health API', tags: ['health-api'] },
  ],
};
