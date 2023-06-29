
/**
 * @callback TiggerFn
 * @param {String} name
 * @param {Object} [payload]
 * @returns {void}
 */

/**
 * @callback OnFn
 * @param {String} name
 * @param {Object} target
 * @param {Function} fn
 * @returns {void}
 */

/**
 * @callback OffFn
 * @param {String} name
 * @param {Object} target
 * @returns {void}
 */

/**
 * @typedef EventBusBase
 * @type {Object}
 * @property {TiggerFn} trigger
 * @property {OnFn} on
 * @property {OffFn} off
 * @typedef {EventBusBase & EventTarget} EventBus
 */
 
/**
 * @typedef UserStatusProps
 * @type {Object}
 * @property {import('./models/user').UserModel} user
 */

/**
 * @callback OrmReadFn
 * @param {String} model
 * @param {Array<Integer>} ids
 * @param {Array<String>} fields
 * @param {Object} [kwargs]
 * @returns {Promise<Array<Object>>}
 */

/**
 * @callback OrmSearchReadFn
 * @param {String} model
 * @param {Array} domain
 * @param {Array<String>} fields
 * @param {Object} [kwargs]
 * @returns {Promise<Array<Object>>}
 */

/**
 * @callback OrmCallFn
 * @param {String} model
 * @param {String} method
 * @param {Array<String>} [args]
 * @param {Object} [kwargs]
 * @returns {Promise<Array<Object>>}
 */

/**
 * @callback OrmWriteFn
 * @param {String} model
 * @param {Array<Integer>} ids
 * @param {Object} data
 * @param {Object} [kwargs]
 * @returns {Promise}
 */

/**
 * @typedef Orm
 * @type {Object}
 * @property {OrmCallFn} call
 * @property {OrmReadFn} read
 * @property {OrmWriteFn} write
 * @property {OrmSearchReadFn} searchRead
 */

/**
 * @typedef UserSession
 * @type {Object}
 * @property {Integer} userId
 * @property {{name: String, uuid}} db
 * @property {String} lang
 * @property {String} tz
 * @property {Object} context
 * @property {Function} hasGroup
 */

/**
 * @callback NotificationAddFn
 * @param {String} message
 * @param {Object} options
 * @returns {void}
 */

/**
 * @callback DialogAddFn
 * @param {Class} dialogClass
 * @param {Object} props
 * @param {Object} options
 * @returns {void}
 */

/**
 * @typedef PopoverOptions
 * @type {Object}
 * @param {Boolean} [closeOnClickAway=true]
 * @param {Function} [onClose]
 * @param {Function} [preventClose]
 * @param {String} [popoverClass]
 * @param {String} [position]
 */

/**
 * @callback PopoverAddFn
 * @param {HTMLElement} target
 * @param {Object} Component
 * @param {Object} props
 * @param {PopoverOptions} [options]
 * @returns {Function}
 */

/**
 * @callback doActionFn
 * @param {Object} actionRequest
 * @param {Object} [options]
 */

/**
 * @callback loadActionFn
 * @param {Object} actionRequest
 * @param {Object} context
 */

/**
 * @typedef Actions
 * @type {Object}
 * @property {doActionFn} doAction
 * @property {loadActionFn} loadAction
 */

/**
 * @typedef EnvService
 * @type {Object}
 * @property {Orm} orm
 * @property {UserSession} user
 * @property {{add: NotificationAddFn}} notification
 * @property {{add: DialogAddFn}} dialog
 * @property {{add: PopoverAddFn}} popover
 * @property {Actions} action
 */

/**
 * @typedef Env
 * @type {Object}
 * @property {EnvService} services
 * @property {Object} context
 * @property {EventBus} chatBus
 * @property {Function} getCurrency
 * @property {Function} _t
 * @property {String} chatModel
 * @property {String} chatroomJsId
 * @property {Function} getShowUser
 * @property {Function} canTranscribe
 */
 
/**
 * @typedef ChatroomState
 * @type {Object}
 * @property {import('./models/user').UserModel} user
 * @property {import('./models/conversation').ConversationModel} selectedConversation
 * @property {Array<import('./models/conversation').ConversationModel>} conversations
 * @property {Boolean} formMaximize
 * @property {Boolean} renderForms
 * @property {{current: String, other: String}} conversationOrder
 */
 
/**
 * @typedef ChatSearchProps
 * @type {Object}
 * @property {String} placeHolder
 * @property {String} eventName
 */
 
/**
 * @typedef ConversationProps
 * @type {Object}
 * @property {import('./models/conversation').ConversationModel} conversation
 * @property {import('./models/conversation').ConversationModel} selectedConversation
 */

/**
 * @typedef ConversationHeaderProps
 * @type {Object}
 * @property {import('./models/conversation').ConversationModel} selectedConversation
 */

/**
 * @typedef TabsContainerProps
 * @type {Object}
 * @property {import('./models/conversation').ConversationModel} selectedConversation
 * @property {Array<import('./models/defaultAnswer').DefaultAnswerModel>} defaultAnswers
 */
 
/**
 * @typedef DefaultAnswerProps
 * @type {Object}
 * @property {import('./models/conversation').ConversationModel} selectedConversation
 * @property {import('./models/defaultAnswer').DefaultAnswerModel} defaultAnswer
 */
 
/**
 * @typedef ToolboxProps
 * @type {Object}
 * @property {import('./models/user').UserModel} user
 * @property {import('./models/conversation').ConversationModel} selectedConversation
 */

/**
 * @typedef MessageProps
 * @type {Object}
 * @property {import('./models/message').MessageModel} message
 */

/**
 * @typedef AudioPlayerState
 * @type {Object}
 * @property {String} time
 * @property {Boolean} show
 * @property {Boolean} error
 * @property {Boolean} paused
 */

/**
 * @typedef InitConversationProps
 * @type {Object}
 * @property {Array<String>} conversationUsedFields
 * @property {import('./models/user').UserModel} user
 * 
 */

export default {}
 