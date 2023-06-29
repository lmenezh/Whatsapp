odoo.define('@8be75bee909eda24768f5b90d853a72ed79d4d652138d1ca9ac25285cb77bbd4',async function(require){'use strict';let __exports={};require('@mail/models/attachment')
const{registerPatch}=require('@mail/model/model_core')
const{attr}=require('@mail/model/model_field')
registerPatch({name:'Attachment',fields:{isDeletable:{compute(){let val=false
if(this.isAcrux){if(this.attachmentLists&&this.attachmentLists.length){val=this.attachmentLists[0].acruxMessageId<=0}else{val=true}}else{val=this._super()}
return val}},isAcrux:attr({default:false,}),}})
return __exports;});;
odoo.define('@cb83745a246e90ddafdc73edfb8370e2a9a2728ae14514fa0243b4c36ce3a07f',async function(require){'use strict';let __exports={};require('@mail/models/attachment_card')
const{registerPatch}=require('@mail/model/model_core')
registerPatch({name:'AttachmentCard',recordMethods:{onClickUnlink(ev){ev.stopPropagation();if(this.attachment&&this.attachment.isAcrux&&this.attachment.chatroomUploader){const chatroomUploader=this.attachment.chatroomUploader
this.attachment.remove()
chatroomUploader.attachmentRemove({attachment:this.attachment})}else{this._super(ev)}}}})
return __exports;});;
odoo.define('@7836f1048a43e935acac64eb4ec059ab24e397e426c16977194d75fe3aaf2e94',async function(require){'use strict';let __exports={};require('@mail/models/attachment_image')
const{registerPatch}=require('@mail/model/model_core')
registerPatch({name:'AttachmentImage',fields:{height:{compute(){let val
if(this.attachmentList&&this.attachmentList.isAcrux){val=100;}else{val=this._super()}
return val}},},recordMethods:{onClickUnlink(ev){ev.stopPropagation();if(this.attachment&&this.attachment.isAcrux&&this.attachment.chatroomUploader){const chatroomUploader=this.attachment.chatroomUploader
this.attachment.remove()
chatroomUploader.attachmentRemove({attachment:this.attachment})}else{this._super(ev)}}}})
return __exports;});;
odoo.define('@4bffadbc1bcf239f094b76bf9d56ba148b0ba00adce07e5c36c8878e8d91b2f4',async function(require){'use strict';let __exports={};require('@mail/models/attachment_list')
const{registerPatch}=require('@mail/model/model_core')
const{attr}=require('@mail/model/model_field')
registerPatch({name:'AttachmentList',fields:{isAcrux:attr({default:false,}),acruxMessageId:attr({identifying:true,})}})
return __exports;});;
odoo.define('@acbad003049675bb72f8aa048c5505a3b1ff288c3fd1edf91e41bc101c8deb3e',async function(require){'use strict';let __exports={};const{Notebook:NotebookBase}=require('@web/core/notebook/notebook')
const Notebook=__exports.Notebook=class Notebook extends NotebookBase{}
Notebook.template='chatroom.Notebook'
return __exports;});;
odoo.define('@40e64ef7ac070ef0af43eab05c6e933b32a5eaff28ed053cf8a71586397c5e7f',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{ActionContainer}=require('@web/webclient/actions/action_container')
const chatroomActions={setup(){this._super()
this.env.bus.removeEventListener('ACTION_MANAGER:UPDATE',this.onActionManagerUpdate)
const superOnActionManagerUpdate=this.onActionManagerUpdate
this.onActionManagerUpdate=({detail:info})=>{if(info?.componentProps?.chatroomTab){}else{superOnActionManagerUpdate({detail:info})}}
this.env.bus.addEventListener('ACTION_MANAGER:UPDATE',this.onActionManagerUpdate)},}
patch(ActionContainer.prototype,'chatroomActions',chatroomActions)
return __exports;});;
odoo.define('@60b8dc7a17a2de3a353240a2ffbcd3eb19bf413fa80b9c484060a290dd4d8406',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{ActionDialog}=require('@web/webclient/actions/action_dialog')
const{onWillDestroy}=owl
const chatroomDialogHack={setup(){this._super()
this.env.bus.trigger('last-dialog',this)
onWillDestroy(()=>this.env.bus.trigger('last-dialog',null))},}
patch(ActionDialog.prototype,'chatroomDialogHack',chatroomDialogHack)
return __exports;});;
odoo.define('@d1abc245ae381d3b54c1221e02f71141b51cc21670997b53445ee1a77a23739f',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{ControlPanel}=require('@web/search/control_panel/control_panel')
const chatroomBreadcrumb={setup(){this._super()},onBreadcrumbClicked(jsId){if(this.env.chatBus){if(this.breadcrumbs.findIndex(item=>item.jsId===jsId)){this._super(jsId)}else{}}else{this._super(jsId)}}}
patch(ControlPanel.prototype,'chatroomBreadcrumb',chatroomBreadcrumb)
return __exports;});;
odoo.define('@ee83fb4fd47333627b4e83065709a34856d3610ba96a2d1833b1516dbaba9acc',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{FormController}=require('@web/views/form/form_controller')
const{useSubEnv,onWillDestroy,onWillStart}=owl
const chatroomForms={setup(){this._super()
if(this.env.chatBus){if(this.env.config){const config={...this.env.config}
config.historyBack=()=>{}
useSubEnv({config})}
onWillStart(()=>this.env.chatBus.on('updateChatroomAction',this,async chatroomTab=>{if(this.props.chatroomTab===chatroomTab){await this.model.load()}}))
onWillDestroy(()=>this.env.chatBus.off('updateChatroomAction',this))}},updateURL(){if(this.env.chatBus){}else{this._super()}},async discard(){await this._super()
if(this.env.chatBus){if(this.model.root.isVirtual&&this.props.resId){await this.model.load({resId:this.props.resId})}}}}
patch(FormController.prototype,'chatroomForms',chatroomForms)
patch(FormController.props,'chatroomFormProps',{chatroomTab:{type:String,optional:true},searchButton:{type:Boolean,optional:true},searchButtonString:{type:String,optional:true},searchAction:{type:Function,optional:true},})
return __exports;});;
odoo.define('@19280e3b2c4bdda942bce43cac714d2ea7b197d938f1048dbcd95b3a53b3ad3e',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{KanbanController}=require('@web/views/kanban/kanban_controller')
const{onWillDestroy,onWillStart}=owl
const chatroomKanban={setup(){this._super()
if(this.props?.chatroomTab&&this.env.chatBus){onWillStart(()=>this.env.chatBus.on('updateChatroomAction',this,async chatroomTab=>{if(this.props.chatroomTab===chatroomTab){await this.model.root.load()
await this.onUpdatedPager()
this.render(true)}}))
onWillDestroy(()=>this.env.chatBus.off('updateChatroomAction',this))}},async openRecord(record,mode){if(this.props?.chatroomTab&&this.props?.chatroomOpenRecord){await this.props?.chatroomOpenRecord(record,mode)}else{await this._super(record,mode)}}}
patch(KanbanController.prototype,'chatroomKanban',chatroomKanban)
patch(KanbanController.props,'chatroomListProps',{chatroomTab:{type:String,optional:true},chatroomOpenRecord:{type:Function,optional:true},})
return __exports;});;
odoo.define('@5a439c50a088acb448703ccbd9a1265e05b30374bcb383d054659e27bd711c45',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{KanbanRenderer}=require('@web/views/kanban/kanban_renderer')
const chatroomKanban={async sortRecordDrop(dataRecordId,dataGroupId,{element,parent,previous}){let record=null
if(this.env.chatBus){const targetGroupId=parent&&parent.dataset.id
const sourceGroup=this.props.list.groups.find((g)=>g.id===dataGroupId)
const targetGroup=this.props.list.groups.find((g)=>g.id===targetGroupId)
if(sourceGroup&&targetGroup){record=sourceGroup.list.records.find((r)=>r.id===dataRecordId)}}
await this._super(dataRecordId,dataGroupId,{element,parent,previous})
if(this.env.chatBus&&record){await this.env.services.orm.call(this.env.chatModel,'update_conversation_bus',[[record.resId]],{context:this.env.context})}}}
patch(KanbanRenderer.prototype,'chatroomKanban',chatroomKanban)
return __exports;});;
odoo.define('@ea2db3fd0e9ecb37bdac2b5bcd0b07416cdd4bbbcc2d45dc99677b5e6f834257',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{ListController}=require('@web/views/list/list_controller')
const{onWillDestroy,onWillStart}=owl
const chatroomLits={setup(){this._super()
if(this.props?.chatroomTab){this.archInfo.headerButtons=[]
if(this.env.chatBus){onWillStart(()=>this.env.chatBus.on('updateChatroomAction',this,async chatroomTab=>{if(this.props.chatroomTab===chatroomTab){await this.model.load()}}))
onWillDestroy(()=>this.env.chatBus.off('updateChatroomAction',this))}}},async chatroomSelect(){const[selected]=await this.getSelectedResIds()
if(this.model?.root?.records){const record=this.model.root.records.find(record=>record.resId===selected)
if(record){this.props.chatroomSelect({data:{...record.data,id:record.resId}})}}}}
patch(ListController.prototype,'chatroomLits',chatroomLits)
patch(ListController.props,'chatroomListProps',{showButtons:{type:Boolean,optional:true},chatroomTab:{type:String,optional:true},chatroomSelect:{type:Function,optional:true},})
return __exports;});;
odoo.define('@40aca894c21e4515549a3a5d23148601f5e3b684104bff0b1e4c01d5a8c39741',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{ChatroomActionTab}=require('@103c7d79cc526d077aeb6c0d794e9325b026ab588961f8ee74e08fcae5becbcb')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{markup}=owl
const AiIntefaceForm=__exports.AiIntefaceForm=class AiIntefaceForm extends ChatroomActionTab{setup(){super.setup()
this.env;}
async onSave(record){await super.onSave(record)}
static iconHtml=markup(`
<svg data-name="OpenAI Logo" width="16px" height="16px" viewBox="140 140 520 520">
    <defs>
        <linearGradient id="linear" x1="100%" y1="22%" x2="0%" y2="78%">
            <stop offset="0%" stop-color="rgb(131,211,231)"></stop>
            <stop offset="2%" stop-color="rgb(127,203,229)"></stop>
            <stop offset="25%" stop-color="rgb(86,115,217)"></stop>
            <stop offset="49%" stop-color="rgb(105,80,190)"></stop>
            <stop offset="98%" stop-color="rgb(197,59,119)"></stop>
            <stop offset="100%" stop-color="rgb(197,59,119)"></stop>
        </linearGradient>
    </defs>
    <path id="logo" d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 
        -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 
        126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 
        10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 
        127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 
        -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 
        3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 
        1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 
        0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 
        0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 
        -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 
        3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 
        0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 
        42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 
        171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 
        -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 
        0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 
        0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 
        0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 
        14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z" fill="currentColor"></path>
</svg>`)}
AiIntefaceForm.props=Object.assign({},AiIntefaceForm.props)
AiIntefaceForm.defaultProps=Object.assign({},AiIntefaceForm.defaultProps)
patch(AiIntefaceForm.props,'chatroomAiIntefaceProps',{viewModel:{type:String,optional:true},viewType:{type:String,optional:true},viewKey:{type:String,optional:true},selectedConversation:{type:ConversationModel.prototype},})
patch(AiIntefaceForm.defaultProps,'chatroomAiIntefaceDefaultProps',{viewModel:'acrux.chat.ai.interface',viewType:'form',viewKey:'aiInteface_form',})
return __exports;});;
odoo.define('@103c7d79cc526d077aeb6c0d794e9325b026ab588961f8ee74e08fcae5becbcb',async function(require){'use strict';let __exports={};const{browser}=require('@web/core/browser/browser')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{Component,xml,onWillStart,onWillDestroy,onWillUpdateProps,useRef}=owl
const ChatroomActionTab=__exports.ChatroomActionTab=class ChatroomActionTab extends Component{setup(){super.setup()
this.env;this.props;this.info={}
this.elRef=useRef('elRef')
this.onActionManagerUpdateBind=this.onActionManagerUpdate.bind(this)
this.env.bus.addEventListener('ACTION_MANAGER:UPDATE',this.onActionManagerUpdateBind)
onWillStart(this.willStart.bind(this))
onWillUpdateProps(this.onWillUpdateProps.bind(this))
onWillDestroy(this.destroy.bind(this))}
async willStart(){await this.makeAction(this.props)}
async onWillUpdateProps(nextProps){await this.makeAction(nextProps)}
async makeAction(props){const prom=new Promise(res=>this.infoResolve=res)
this.env.services.action.doAction(this.getActionConfig(props),this.getActionOptions(props))
await prom}
destroy(){this.env.bus.removeEventListener('ACTION_MANAGER:UPDATE',this.onActionManagerUpdateBind)}
onActionManagerUpdate({detail:info}){if(info?.componentProps?.chatroomTab===this.props.viewKey){this.info=info
this.info.Component=class ChatroomController extends info.Component{onMounted(){const hashOrigin=this.env.services.router?.current?.hash
const current_action=browser.sessionStorage.getItem('current_action')
super.onMounted()
browser.sessionStorage.setItem('current_action',current_action)
if(hashOrigin){this.env.services.router.replaceState(hashOrigin,{replace:true})}}}
this.infoResolve()}}
getActionConfig(props){const context={...this.env.context,...this.getExtraContext(props)}
this._contextHook(context)
return{type:'ir.actions.act_window',view_type:'form',view_mode:props.viewType,res_model:props.viewModel,views:this.getActionViews(props),target:'current',context:context,res_id:props.viewResId,flags:this.getActionFlags(props),name:props.viewTitle,}}
getActionViews(props){let out
if(props.viewType==='form'){out=[[props.viewId,props.viewType]]}else if(props.viewType==='list'){out=[[props.viewId,props.viewType],[false,'search']]}else if(props.viewType==='kanban'){out=[[props.viewId,props.viewType],[false,'search']]}else{throw new Error('Not implemented.')}
return out}
_contextHook(){}
getExtraContext(props){return{default_conversation_id:props?.selectedConversation?.id}}
getActionFlags(props){let out
if(props.viewType==='form'){out={withControlPanel:false,footerToButtons:false,hasSearchView:false,hasSidebar:false,mode:'edit',searchMenuTypes:false,}}else if(props.viewType==='list'){out={withControlPanel:true,footerToButtons:false,hasSearchView:true,hasSidebar:false,searchMenuTypes:['filter','groupBy'],withSearchPanel:true,withSearchBar:true,}}else if(props.viewType==='kanban'){out={withControlPanel:true,footerToButtons:false,hasSearchView:true,hasSidebar:false,searchMenuTypes:['filter','groupBy'],withSearchPanel:true,withSearchBar:true,}}else{throw new Error('Not implemented.')}
return out}
getActionOptions(props){let stackPosition='replaceCurrentAction'
if(this.env.chatroomJsId===this.env.services.action.currentController.action.jsId){stackPosition=false}
return{clearBreadcrumbs:false,stackPosition:stackPosition,props:this.getActionProps(props),}}
getActionProps(props){const out={chatroomTab:props.viewKey}
if(props.viewType==='form'){Object.assign(out,{onSave:this.onSave.bind(this),searchButton:props.searchButton,searchButtonString:props.searchButtonString||this.env._t('Search'),searchAction:this._onSearchChatroom.bind(this)})}else if(props.viewType==='list'){}else if(props.viewType==='kanban'){}else{throw new Error('Not implemented.')}
return out}
_getSearchAction(){const context={...this.env.context,chatroom_wizard_search:true}
return{type:'ir.actions.act_window',view_type:'form',view_mode:'list',res_model:this.props.viewModel,domain:this._getOnSearchChatroomDomain(),views:[[false,'list']],target:'new',context:context,}}
_onSearchChatroom(){const action=this._getSearchAction()
const options={props:{showButtons:false,chatroomTab:this.props.viewKey,chatroomSelect:this._onSelectedRecord.bind(this)}}
return this.env.services.action.doAction(action,options)}
_getOnSearchChatroomDomain(){return[]}
async _onSelectedRecord(record){await this.env.services.action.doAction({type:'ir.actions.act_window_close'})
await this.onSave(record)}
async onSave(record){if(this.props.viewType==='form'){if(record.data.partner_id){if(record.data.partner_id[0]!==this.props.selectedConversation.partner.id){await this.savePartner(record.data.partner_id)}}}}
async savePartner(partner){await this.env.services.orm.write(this.env.chatModel,[this.props.selectedConversation.id],{res_partner_id:partner[0]},{context:this.env.context})
const[{image_url}]=await this.env.services.orm.read(this.env.chatModel,[this.props.selectedConversation.id],['image_url'],{context:this.env.context})
this.props.selectedConversation.updateFromJson({res_partner_id:partner,image_url})
this.env.chatBus.trigger('updateConversation',this.props.selectedConversation)}
isInside(x,y){let out
const rect=this.elRef.el.getBoundingClientRect()
if(rect.top<=y&&y<=rect.bottom){out=rect.left<=x&&x<=rect.right}else{out=false}
return out}}
Object.assign(ChatroomActionTab,{props:{viewId:{type:Number,optional:true},viewModel:String,viewType:String,viewTitle:String,viewKey:String,viewResId:{type:Number,optional:true},selectedConversation:{type:ConversationModel.prototype,optional:true},searchButton:{type:Boolean,optional:true},searchButtonString:{type:String,optional:true},},defaultProps:{}})
ChatroomActionTab.template=xml`
    <t t-name="chatroom.ActionTab">
      <div class="o_ActionTab" t-ref="elRef">
        <t t-if="info.Component" t-component="info.Component" className="'o_action'" t-props="info.componentProps" t-key="info.id"/>
      </div>
    </t>`;return __exports;});;
odoo.define('@d3310142513a60875a36765d19fdb3dd7b162511bc1eeda32ca1cd870284e772',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{ChatroomActionTab}=require('@103c7d79cc526d077aeb6c0d794e9325b026ab588961f8ee74e08fcae5becbcb')
const ConversationForm=__exports.ConversationForm=class ConversationForm extends ChatroomActionTab{setup(){super.setup()
this.env;}
async onSave(record){await super.onSave(record)
await this.env.services.orm.call(this.env.chatModel,'update_conversation_bus',[[record.data.id]],{context:this.env.context})}}
ConversationForm.props=Object.assign({},ConversationForm.props)
ConversationForm.defaultProps=Object.assign({},ConversationForm.defaultProps)
patch(ConversationForm.props,'chatroomConversationProps',{viewResId:{type:Number},viewModel:{type:String,optional:true},viewType:{type:String,optional:true},viewKey:{type:String,optional:true},})
patch(ConversationForm.defaultProps,'chatroomConversationDefaultProps',{viewModel:'acrux.chat.conversation',viewType:'form',viewKey:'conv_form',})
return __exports;});;
odoo.define('@6b827bd088194ec1bd28907241858b132687b2745bb08d69a01a07dbdc7f175f',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{ChatroomActionTab}=require('@103c7d79cc526d077aeb6c0d794e9325b026ab588961f8ee74e08fcae5becbcb')
const ConversationKanban=__exports.ConversationKanban=class ConversationKanban extends ChatroomActionTab{setup(){super.setup()
this.env;}
getActionProps(props){const out=super.getActionProps(props)
Object.assign(out,{chatroomOpenRecord:this.openRecord.bind(this)})
return out}
getExtraContext(props){return{chatroom_fold_null_group:true,...super.getExtraContext(props)}}
async openRecord(record,mode){if(mode==='edit'){const action={type:'ir.actions.act_window',name:this.env._t('Edit'),view_type:'form',view_mode:'form',res_model:this.env.chatModel,views:[[this.props.formViewId,'form']],target:'new',res_id:record.resId,context:{...this.env.context,only_edit:true},}
const onSave=async()=>{await this.env.services.orm.call(this.env.chatModel,'update_conversation_bus',[[record.resId]],{context:this.env.context})
await this.env.services.action.doAction({type:'ir.actions.act_window_close'})}
await this.env.services.action.doAction(action,{props:{onSave}})}else{const conv=await this.env.services.orm.call(this.env.chatModel,'build_dict',[[record.resId],22],{context:this.env.context})
this.env.chatBus.trigger('initConversation',conv[0])}}
async onSave(record){await super.onSave(record)}}
ConversationKanban.props=Object.assign({},ConversationKanban.props)
ConversationKanban.defaultProps=Object.assign({},ConversationKanban.defaultProps)
patch(ConversationKanban.props,'chatroomConversationKanbanProps',{viewModel:{type:String,optional:true},viewType:{type:String,optional:true},viewKey:{type:String,optional:true},formViewId:{type:Number,optional:true},})
patch(ConversationKanban.defaultProps,'chatroomConversationKanbanDefaultProps',{viewModel:'acrux.chat.conversation',viewType:'kanban',viewKey:'conv_kanban',})
return __exports;});;
odoo.define('@30bcd30850cd19012d4f3f579cc45e01e3d534df66b8203139cb8a307d419749',async function(require){'use strict';let __exports={};const{patch}=require('@web/core/utils/patch')
const{ChatroomActionTab}=require('@103c7d79cc526d077aeb6c0d794e9325b026ab588961f8ee74e08fcae5becbcb')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const PartnerForm=__exports.PartnerForm=class PartnerForm extends ChatroomActionTab{setup(){super.setup()
this.env;this.props}
getExtraContext(props){return Object.assign(super.getExtraContext(props),{default_mobile:props.selectedConversation.numberFormat,default_phone:props.selectedConversation.numberFormat,default_name:props.selectedConversation.name,default_user_id:this.env.services.user.userId,})}
async onSave(record){await super.onSave(record)
if(record.data.id!==this.props.selectedConversation.partner.id){await this.savePartner([record.data.id,record.data.display_name])}}}
PartnerForm.props=Object.assign({},PartnerForm.props)
PartnerForm.defaultProps=Object.assign({},PartnerForm.defaultProps)
patch(PartnerForm.props,'chatroomPartnerProps',{selectedConversation:{type:ConversationModel.prototype},viewModel:{type:String,optional:true},viewType:{type:String,optional:true},viewKey:{type:String,optional:true},})
patch(PartnerForm.defaultProps,'chatroomPartnerDefaultProps',{viewModel:'res.partner',viewType:'form',viewKey:'partner_form',})
return __exports;});;
odoo.define('@823cc1a7e61fd78e5058a6cd3f3004f796bbcf6fd6d7c45b7368b77e32deee31',async function(require){'use strict';let __exports={};const{browser}=require('@web/core/browser/browser')
const{getMessagingComponent}=require('@mail/utils/messaging_component')
const{link,unlink}=require('@mail/model/model_field_command')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{Component,useRef,onWillDestroy}=owl
const geAttachmentNextTemporaryId=__exports.geAttachmentNextTemporaryId=(function(){let tmpId=0
return()=>{tmpId+=1
return tmpId}})()
const AttachmentUpload=__exports.AttachmentUpload=class AttachmentUpload extends Component{setup(){super.setup()
this.env
this.fileUploader=new this.env.services.messaging.modelManager.models.FileUploader()
this.fileInput=useRef('fileInput')
this.env.chatBus.on('initAttachment',this,()=>this.fileInput.el.click())
this.env.chatBus.on('uploadAttachment',this,files=>this.onChangeAttachment({target:{files}}))
this.env.chatBus.on('updateAttachmentUI',this,this.render)
onWillDestroy(this.destroy.bind(this))}
destroy(){this.env.chatBus.off('initAttachment',this)
this.env.chatBus.off('uploadAttachment',this)
this.env.chatBus.off('updateAttachmentUI',this)}
async onChangeAttachment(ev){try{this.env.services.ui.block()
const attachments=await this.uploadFiles(ev.target.files)
for(const attachment of attachments){attachment.update({attachmentLists:link(this.props.attachList)})}}finally{this.env.chatBus.trigger('attachCreated')
this.env.services.ui.unblock()
this.render()}}
async uploadFiles(files){const out=await this._performUpload({files});if(this.fileInput&&this.fileInput.el){this.fileInput.el.value='';}
return out}
async _performUpload({files}){const Attachment=this.env.services.messaging.modelManager.models.Attachment
const uploadingAttachments=new Map()
for(const file of files){uploadingAttachments.set(file,Attachment.insert({filename:file.name,id:geAttachmentNextTemporaryId(),isUploading:true,mimetype:file.type,name:file.name,originThread:undefined,isAcrux:true,}))}
const attachments=[]
for await(const file of files){const uploadingAttachment=uploadingAttachments.get(file)
if(!uploadingAttachment.exists()){continue}
try{const formData=this.fileUploader._createFormData({file})
formData.append('conversation_id',this.props.selectedConversation?.id)
formData.append('connector_type',this.props.selectedConversation?.connectorType)
const response=await browser.fetch('/web/binary/upload_attachment_chat',{method:'POST',body:formData,signal:uploadingAttachment.uploadingAbortController.signal,})
const attachmentData=await response.json()
if(uploadingAttachment.exists()){uploadingAttachment.delete()}
if(attachmentData.error||!attachmentData.id){const msg=attachmentData.error||this.env._t('Error uploading file.')
this.env.services.notification.add(msg,{type:'danger'})}else{const attachment=Attachment.insert(attachmentData)
attachment.chatroomUploader=this
attachments.push(attachment)}}catch(e){if(e.name!=='AbortError'){throw e}}}
return attachments}
attachmentRemove({attachment}){attachment.update({attachmentLists:unlink(this.props.attachList)})
this.env.chatBus.trigger('attachRemoved')
this.render()}}
Object.assign(AttachmentUpload,{template:'chatroom.AttachmentUpload',props:{attachList:{type:Object},selectedConversation:{type:ConversationModel.prototype,optional:true,}},components:{AttachmentImage:getMessagingComponent('AttachmentImage'),AttachmentCard:getMessagingComponent('AttachmentCard'),}})
return __exports;});;
odoo.define('@a0ab5b871d0b9b4e8f7af01774f6c90121c5c8605b6df6e2afa06745132533d4',async function(require){'use strict';let __exports={};const{Component,useState,useRef}=owl
const AudioPlayer=__exports.AudioPlayer=class AudioPlayer extends Component{setup(){super.setup()
this.state=useState({time:'',show:false,error:null,paused:true})
this.audioRef=useRef('audioRef')
this.playbackRef=useRef('playbackRef')
this.progressRef=useRef('progressRef')
this.ignoreTimeUpdateEvent=false}
onLoadData(event){const audio=event.target
this.state.time=this.calculateTime(this.props.duration||audio.duration)
this.state.show=true}
onError(){this.state.error=true
this.state.show=true}
onTimeUpdate(event){const audio=event.target
let percentage=audio.currentTime*100.00/(this.props.duration||audio.duration)
percentage=Math.round(percentage)
this.playbackRef.el.style.width=`${percentage}%`
if(!this.ignoreTimeUpdateEvent){this.state.time=this.calculateTime(audio.currentTime)}}
onEnded(event){this.ignoreTimeUpdateEvent=true
const audio=event.target
audio.currentTime=0
this.state.paused=true
this.state.time=this.calculateTime(this.props.duration||audio.duration)}
onPlayPause(event){event.preventDefault();this.ignoreTimeUpdateEvent=false
if(this.state.paused){this.audioRef.el.play()}else{this.audioRef.el.pause()}
this.state.paused=!this.state.paused}
changeProgress(event){this.ignoreTimeUpdateEvent=false
let relative_position,percentage
const position=this.progressRef.el.getBoundingClientRect()
relative_position=event.pageX-position.left
percentage=relative_position/position.width
if(Number.isFinite(this.props.duration||this.audioRef.el.duration)){this.audioRef.el.currentTime=(this.props.duration||this.audioRef.el.duration)*percentage}}
calculateTime(num){let out=''
if(!isNaN(num)&&Number.isFinite(num)){let zero=(x)=>x<10?'0'+x:x;let minutes=Math.floor(num/60.0);let seconds=Math.round(num)%60;let hours=Math.floor(minutes/60.0);minutes=Math.round(minutes)%60;if(hours){out=zero(hours)+":";}
out+=zero(minutes)+":"+zero(seconds);}
return out;}
onDownload(){if(this.props.audio.src){const link=document.createElement('a')
if(this.props.audio.src.startsWith('blob:')){link.href=this.props.audio.src
link.download='audio.oga'}else{if(this.props.audio.src.startsWith('/web/content/')){const split=this.props.audio.src.split('/')
const attachId=split[split.length-1]
link.href=`/web/content/ir.attachment/${attachId}/datas?download=true`}else{link.href=this.props.audio.src}
link.download=''}
link.click()}}}
Object.assign(AudioPlayer,{template:'chatroom.AudioPlayer',props:{audio:Object,duration:{type:Number,optional:true,}},})
return __exports;});;
odoo.define('@b776165a95553fcc22eda64dc09cd1e02d2db4727ab51cf648290a373a0251c6',async function(require){'use strict';let __exports={};const{Component,useRef}=owl
const ChatSearch=__exports.ChatSearch=class ChatSearch extends Component{setup(){super.setup()
this.env;this.props;this.inputSearch=useRef('inputSearch')}
onKeypress(event){if(event.which===13){this.env.chatBus.trigger(this.props.eventName,{search:this.inputSearch.el.value})}}
onSearch(){this.env.chatBus.trigger(this.props.eventName,{search:this.inputSearch.el.value})}}
Object.assign(ChatSearch,{template:'chatroom.ChatSearch',props:{placeHolder:{type:String,optional:true},eventName:String,},defaultProps:{placeHolder:'',}})
return __exports;});;
odoo.define('@42ffbf6224f23aacdf6b9a6289d4e396904ef6225cba7443d521319d2137e2b6',async function(require){'use strict';let __exports={};const{useDraggable}=require('@web/core/utils/draggable')
const{WarningDialog}=require('@web/core/errors/error_dialogs')
const{SIZES}=require('@web/core/ui/ui_service')
const{ChatroomHeader}=require('@54b543691528c8f74a0ea8c47d8a8d71f5d481321088b43516787400b97b1a59')
const{Conversation}=require('@0ac266676776f61364330bb041a16d836d8b315459e04c1a3381740f295958c7')
const{ConversationHeader}=require('@beeaf954ff9ccf25f357f70e74c5694ebdfbd24b19c687bd9a0808adec370c9f')
const{ConversationThread}=require('@717da89923407d2bbdeadd4f99b9e8918889493cac89cdeb293e1e42f46b02fa')
const{ProductContainer}=require('@aedb85b64f8970ed4ccdcfb5fad7484eb5f9502792073b672b574c2d95ef5fe2')
const{TabsContainer}=require('@af0df1a5affde864bfaca0edba19137ac4e7199f2cb7ae310c45d7b47aaac68b')
const{Toolbox}=require('@c011635ccdcd3301f40c07724a28d782d0f498e544a6747890cf878476644d9c')
const{UserStatus}=require('@3c9d8b38fc49fa01016356514efedc5b76852938fc0e4643ad7b690072d10b96')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{DefaultAnswerModel}=require('@691be66bc681670fb0cd11c07adec04e8dfc38741d2ef37bf718faf4dab4f3b1')
const{UserModel}=require('@6e344e9f6e92958c137d3f0fd12f4b185e994c729e92e763551752e4b953217a')
const{url}=require('@web/core/utils/urls')
const{browser}=require('@web/core/browser/browser')
const{Component,EventBus,useSubEnv,useState,onWillDestroy,onWillStart,useRef}=owl
const Chatroom=__exports.Chatroom=class Chatroom extends Component{setup(){super.setup()
this.env;this.state=useState(this.getInitState())
this.currencyId=null
this.defaultAnswers=[]
this.canPlay=typeof(Audio)!=='undefined'
this.audio=null
this.myController=null
this.tabSelected=null
this.chatroomRef=useRef('chatroomRef')
this.firstSideRef=useRef('firstSideRef')
this.middleSideRef=useRef('middleSideRef')
this.showUserInMessage=false
this.canTranscribe=false
useSubEnv(this.getSubEnv())
this.productDragAndDrop()
this.onNotificationBind=this.onNotification.bind(this)
this.visibilityChangeBind=this.visibilityChange.bind(this)
this.env.chatBus.on('updateUserStatus',this,this.changeStatusView)
this.env.chatBus.on('selectConversation',this,this.selectConversation)
this.env.chatBus.on('deleteConversation',this,this.deleteConversation)
this.env.chatBus.on('mobileNavigate',this,this.mobileNavigate)
this.env.chatBus.on('orderConversations',this,this.upsertConversation)
this.env.services.bus_service.addEventListener('notification',this.onNotificationBind)
this.env.services.ui.bus.on('resize',this,this.resize)
document.addEventListener('visibilitychange',this.visibilityChangeBind)
onWillStart(this.willStart.bind(this))
onWillDestroy(this.destroy.bind(this))
this.env.bus.on('ACTION_MANAGER:UI-UPDATED',this,()=>{this.myController=this.env.services.action.currentController
this.state.renderForms=true
this.env.bus.off('ACTION_MANAGER:UI-UPDATED',this)})}
getInitState(){const conversationOrder=browser.localStorage.getItem('chatroomConversationOrder')
return{user:new UserModel(this),selectedConversation:null,conversations:[],currentMobileSide:'',formMaximize:false,renderForms:false,conversationOrder:conversationOrder&&JSON.parse(conversationOrder)||{current:'desc',other:'asc'}}}
getSubEnv(){return{context:this.props.action.context,chatBus:new EventBus(),chatModel:'acrux.chat.conversation',getCurrency:()=>this.currencyId,chatroomJsId:this.props.action.jsId,getShowUser:()=>this.showUserInMessage,canTranscribe:()=>this.canTranscribe}}
async willStart(){this.currencyId=await this.getCurrency()
this.defaultAnswers=await this.getDefaultAnswers()
this.conversationUsedFields=await this.getConversationUsedFields()
this.conversationInfoForm=await this.getConversationInfoView()
this.conversationKanban=await this.getConversationKanbanView()
this.aiIntefaceForm=await this.getAiIntefaceView()
this.state.user.updateFromJson(await this.getUserPreference())
this.showUserInMessage=await this.env.services.user.hasGroup('whatsapp_connector.group_chat_show_user_in_message')
this.canTranscribe=await this.getTranscriptionModel()
await this.changeStatusView(this.state.user)
if(this.canPlay){this.audio=new Audio()
if(this.audio.canPlayType('audio/ogg; codecs=vorbis')){this.audio.src=url('/mail/static/src/audio/ting.ogg')}else{this.audio.src=url('/mail/static/src/audio/ting.mp3')}}
if(this.props.selectedConversationId){const conv=this.state.conversations.find(conv=>conv.id===this.props.selectedConversationId)
if(conv){await this.selectConversation({conv})}}}
destroy(){this.env.services.bus_service.removeEventListener('notification',this.onNotificationBind)
this.env.chatBus.off('updateUserStatus',this)
this.env.chatBus.off('selectConversation',this)
this.env.chatBus.off('deleteConversation',this)
this.env.chatBus.off('mobileNavigate',this)
this.env.chatBus.off('orderConversations',this)
this.env.services.ui.bus.off('resize',this)
document.removeEventListener('visibilitychange',this.visibilityChangeBind)}
async setServerConversation(){const{orm}=this.env.services
const data=await orm.call(this.env.chatModel,'search_active_conversation',[],{context:this.env.context})
await this.upsertConversation(data)
return this.state.conversations}
async getCurrency(){const{orm}=this.env.services
const currency=await orm.read('res.company',[this.env.services.company.currentCompany.id],['currency_id'],{context:this.env.context})
return currency[0].currency_id[0]}
async getDefaultAnswers(){const{orm}=this.env.services
const data=await orm.call('acrux.chat.default.answer','get_for_chatroom',[],{context:this.env.context})
return data.map(answer=>new DefaultAnswerModel(this,answer))}
async getConversationInfoView(){const{orm}=this.env.services
const data=await orm.call(this.env.chatModel,'check_object_reference',['','view_whatsapp_connector_conversation_chatroom_form'],{context:this.context})
return data[1]}
async getConversationKanbanView(){const{orm}=this.env.services
const data=await orm.call(this.env.chatModel,'check_object_reference',['','view_whatsapp_connector_conversation_kanban'],{context:this.context})
return data[1]}
async getAiIntefaceView(){const{orm}=this.env.services
const data=await orm.call(this.env.chatModel,'check_object_reference',['','view_whatsapp_connector_ai_interface_form'],{context:this.context})
return data[1]}
async getTranscriptionModel(){const{orm}=this.env.services
const data=await orm.searchRead('acrux.chat.ai.config',[['operation_key','=','audio_transcriptions']],['name'],{context:this.context,limit:1})
return data.length?data[0].id:0}
async getConversationUsedFields(){const{orm}=this.env.services
const data=await orm.call(this.env.chatModel,'get_fields_to_read',[],{context:this.env.context})
return data}
get userPreferenceFild(){return['id','chatroom_signing_active','acrux_chat_active']}
async getUserPreference(){const data=await this.env.services.orm.read('res.users',[this.env.services.user.userId],this.userPreferenceFild,{context:this.env.context})
return data[0]}
async upsertConversation(convList){const order=this.state.conversationOrder
const conversations=[...this.state.conversations]
if(convList){if(!Array.isArray(convList)){convList=[convList]}
for(const convData of convList){const conv=conversations.find(conv=>conv.id==convData.id)
if(conv){conv.updateFromJson(convData)
await conv.buildExtraObj()}else{const newConv=new ConversationModel(this,convData)
await newConv.buildExtraObj()
await newConv.setMessages(convData.messages)
const currentOrder=(newConv.status==='current')?order.current:order.other
if(currentOrder==='lock_desc'){conversations.unshift(newConv)}else{conversations.push(newConv)}}}}
const currentConversations=conversations.filter(conv=>conv.status==='current')
const notCurrentConversations=conversations.filter(conv=>conv.status!=='current')
const orderFn=(a,b,criteria)=>{let out
if(criteria==='desc'){out=a.lastActivity<b.lastActivity}else{out=a.lastActivity>b.lastActivity}
return out?1:-1}
if(['asc','desc'].includes(order.current)){currentConversations.sort((a,b)=>orderFn(a,b,order.current))}
if(['asc','desc'].includes(order.other)){notCurrentConversations.sort((a,b)=>orderFn(a,b,order.other))}
this.state.conversations=[...currentConversations,...notCurrentConversations]}
async reorderConversations(event){const target=event.currentTarget||event.target
if(target){const orderChange={desc:'lock_desc',lock_desc:'asc',asc:'lock_asc',lock_asc:'desc'}
const fildName=target.classList.contains('acrux_order_new_conversation')?'other':'current'
this.state.conversationOrder[fildName]=orderChange[this.state.conversationOrder[fildName]]
browser.localStorage.setItem('chatroomConversationOrder',JSON.stringify(this.state.conversationOrder))
await this.upsertConversation()}}
async changeStatusView({status}){this.state.user.status=status
await this.selectConversation({conv:null})
if(status){await this.setServerConversation()}else{this.state.conversations=[]}}
get waintingConversations(){const current=new Set(this.currentConversations.map(conv=>conv.id))
return this.state.conversations.filter(conv=>!current.has(conv.id))}
get currentConversations(){return this.state.conversations.filter(conv=>conv.isMine())}
async selectConversation({conv}){this.state.selectedConversation=conv
if(this.myController){this.myController.props.selectedConversationId=conv?conv.id:undefined}
if(conv){await conv.selected()
this.mobileNavigate('middleSide')}}
async onNotification({detail:notifications}){if(notifications){const proms=notifications.map(d=>this.notifactionProcessor(d))
await Promise.all(proms)}}
async notifactionProcessor(data){const proms=[]
if(data.type==='delete_conversation'&&this.state.user.status){proms.push(...data.payload.map(m=>this.onDeleteConversation(m)))}
if(data.type==='delete_taken_conversation'&&this.state.user.status){proms.push(...data.payload.map(m=>this.onDeleteTakenConversation(m)))}
if(data.type==='new_messages'&&this.state.user.status){proms.push(...data.payload.map(m=>this.onNewMessage(m)))}
if(data.type==='init_conversation'&&this.state.user.status){proms.push(...data.payload.map(m=>this.onInitConversation(m)))}
if(data.type==='change_status'){proms.push(...data.payload.map(m=>this.onChangeStatus(m)))}
if(data.type==='update_conversation'&&this.state.user.status){proms.push(...data.payload.map(m=>this.onUpdateConversation(m)))}
if(data.type==='assign_conversation'&&this.state.user.status){proms.push(...data.payload.map(m=>this.addConversation(m)))}
if(data.type==='error_messages'&&this.state.user.status){proms.push(...data.payload.map(m=>this.onErrorMessages(m)))}
await Promise.all(proms)}
async onNewMessage(convData){const{desk_notify,messages}=convData
const someMessageNew=messages.some(msg=>!msg.from_me)
const convBak=this.state.conversations.find(x=>x.id===convData.id)
let conv=null
const upsertConv=async()=>{await this.upsertConversation(convData)
conv=this.state.conversations.find(x=>x.id===convData.id)}
if(convBak){await upsertConv()
await conv.appendMessages(messages)
if(someMessageNew){conv.calculateMessageCount()
if(this.state.selectedConversation===conv&&!document.hidden&&conv.isMine()){await conv.messageSeen()}}}else if(convData.status=='new'){await upsertConv()
if(someMessageNew){conv.calculateMessageCount()}}
if(conv&&document.hidden){if('all'&&desk_notify||('mines'===desk_notify&&conv.agent.id===this.env.services.user.userId)){if(someMessageNew){const msg=this.env._t('New messages from ')+conv.name
this.env.services.notification.add(msg,{type:'info'})
await this.playNotification()}}}
return conv}
async onUpdateConversation(convData){let conv=this.state.conversations.find(x=>x.id===convData.id)
if(conv){await this.upsertConversation(convData)}
this.env.chatBus.trigger('updateConversation',convData)
if(['tab_conv_kanban'].includes(this.tabSelected)){this.env.chatBus.trigger('updateChatroomAction','conv_kanban')}
return conv}
async onDeleteConversation(convData){if(convData.agent_id[0]!==this.env.services.user.userId){await this.deleteConversation(convData)}}
async onDeleteTakenConversation(convData){let out
if(convData.agent_id[0]===this.env.services.user.userId){await this.deleteConversation(convData)}
return out}
async onInitConversation(convData){const conv=await this.addConversation(convData)
await this.selectConversation({conv})
return conv}
async addConversation(convData){await this.upsertConversation(convData)
const conv=this.state.conversations.find(x=>x.id===convData.id)
if(this.state.selectedConversation&&this.state.selectedConversation.id!==conv.id){await conv.setMessages(convData.messages);}
return conv}
async onChangeStatus(data){if(data.agent_id[0]===this.env.services.user.userId){if(this.state.user.status!==data.status){this.state.user.status=data.status
this.changeStatusView(data)}
if(this.state.user.signingActive!==data.signing_active){this.state.user.signingActive=data.signing_active}}}
async onErrorMessages(convData){const conv=this.state.conversations.find(x=>x.id===convData.id)
if(conv){conv.updateFromJson(convData)
await conv.buildExtraObj()
const messageIds=convData.messages.map(msg=>msg.id)
const message=conv.messages.find(msg=>messageIds.includes(msg.id))
this.env.services.dialog.add(WarningDialog,{message:this.env._t('Error in conversation with ')+conv.name},{onClose:async()=>{if(this.state.selectedConversation===conv){if(message){this.env.chatBus.trigger('inmediateScrollToMessage',{message})}}else{if(message){this.env.chatBus.trigger('scrollToMessage',{message})}
await this.selectConversation({conv})}}})}}
async deleteConversation({id}){let conv=this.state.conversations.find(x=>x.id==id);this.state.conversations=this.state.conversations.filter(x=>x.id!=id);if(conv){if(conv===this.state.selectedConversation){await this.selectConversation({conv:null})
this.mobileNavigate('firstSide')}}
return Promise.resolve(conv);}
productDragAndDrop(){useDraggable({enable:true,ref:this.chatroomRef,elements:'.acrux_Product',cursor:'grabbing',onDragStart:()=>this.env.chatBus.trigger('productDragInit'),onDragEnd:()=>this.env.chatBus.trigger('productDragEnd'),onDrag:({x,y})=>this.env.chatBus.trigger('productDragging',{x,y}),onDrop:({x,y,element})=>{const product={id:element.dataset.id,name:element.dataset.name}
this.env.chatBus.trigger('productDrop',{x,y,product})},})}
visibilityChange(){if(!document.hidden&&this.state.selectedConversation&&this.state.selectedConversation.isMine()){this.state.selectedConversation.messageSeen()}}
mobileNavigate(target){if(this.env.services.ui.size<=SIZES.MD){this.state.currentMobileSide=target}}
get firtSideMobile(){let out=''
if(this.env.services.ui.size<=SIZES.MD){const{currentMobileSide}=this.state
if(currentMobileSide==='firstSide'){}else if(currentMobileSide==='middleSide'){if(this.env.services.ui.size<SIZES.MD){out='d-none'}}else if(currentMobileSide==='lastSide'){out='d-none'}}
return out}
get middleSideMobile(){let out=''
if(this.env.services.ui.size<=SIZES.MD){const{currentMobileSide}=this.state
if(currentMobileSide==='firstSide'){if(this.env.services.ui.size<SIZES.MD){out='d-none'}}else if(currentMobileSide==='middleSide'){}else if(currentMobileSide==='lastSide'){out='d-none'}}
return out}
get lastSideMobile(){let out=''
if(this.env.services.ui.size<=SIZES.MD){const{currentMobileSide}=this.state
if(currentMobileSide==='firstSide'){out='d-none'}else if(currentMobileSide==='middleSide'){out='d-none'}else if(currentMobileSide==='lastSide'){out='col-12'}}
return out}
resize(){this.state.currentMobileSide=''}
async playNotification(){if(this.canPlay){try{await this.audio.play()}catch{}}}
toggleFormSize(){this.state.formMaximize=!this.state.formMaximize}
updateTab(tabId){if(this.myController){this.myController.props.tabSelected=tabId}
this.tabSelected=tabId}
getSortIcon(str){const orderIcon={desc:'fa-arrow-up',asc:'fa-arrow-down',lock_desc:'fa-lock',lock_asc:'fa-lock'}
return orderIcon[str]}
getSortTitle(str){const orderTitle={desc:this.env._t('New Chats Up'),asc:this.env._t('New Chats Down'),lock_desc:this.env._t('Static Order'),lock_asc:this.env._t('Static Order'),}
return orderTitle[str]}}
Object.assign(Chatroom,{props:{action:Object,actionId:{type:Number,optional:true},className:String,globalState:{type:Object,optional:true},selectedConversationId:{type:Number,optional:true},tabSelected:{type:String,optional:true}},components:{ChatroomHeader,Conversation,ConversationHeader,ConversationThread,ProductContainer,TabsContainer,Toolbox,UserStatus,},template:'chatroom.Chatroom',})
return __exports;});;
odoo.define('@54b543691528c8f74a0ea8c47d8a8d71f5d481321088b43516787400b97b1a59',async function(require){'use strict';let __exports={};const{Component}=owl
const ChatroomHeader=__exports.ChatroomHeader=class ChatroomHeader extends Component{setup(){super.setup()}}
Object.assign(ChatroomHeader,{template:'chatroom.ChatroomHeader',props:{slots:Object,className:{type:String,optional:true}},defaultProps:{className:''}})
return __exports;});;
odoo.define('@0ac266676776f61364330bb041a16d836d8b315459e04c1a3381740f295958c7',async function(require){'use strict';let __exports={};const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{Component}=owl
const Conversation=__exports.Conversation=class Conversation extends Component{setup(){super.setup()
this.env
this.props}
onSelect(){this.env.chatBus.trigger('selectConversation',{conv:this.props.conversation})}
onClose(event){event.stopPropagation()
this.env.chatBus.trigger('deleteConversation',this.props.conversation)}
get isSelected(){const{selectedConversation,conversation}=this.props
return(selectedConversation&&selectedConversation===conversation)}}
Object.assign(Conversation,{template:'chatroom.Conversation',props:{conversation:ConversationModel.prototype,selectedConversation:ConversationModel.prototype,}})
return __exports;});;
odoo.define('@0834dd1040d7a3b188437dce6ad6f011757b7e8b052b9d8ccdeab7e03abe8763',async function(require){'use strict';let __exports={};const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{Component}=owl
const ConversationCard=__exports.ConversationCard=class ConversationCard extends Component{setup(){super.setup()
this.env;}
onClick(){this.env.chatBus.trigger('initAndNotifyConversation',this.props.conversation)}}
Object.assign(ConversationCard,{template:'chatroom.ConversationCard',props:{conversation:ConversationModel.prototype},components:{}})
return __exports;});;
odoo.define('@beeaf954ff9ccf25f357f70e74c5694ebdfbd24b19c687bd9a0808adec370c9f',async function(require){'use strict';let __exports={};const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{Component}=owl
const ConversationHeader=__exports.ConversationHeader=class ConversationHeader extends Component{setup(){super.setup()
this.env
this.props}}
Object.assign(ConversationHeader,{template:'chatroom.ConversationHeader',props:{selectedConversation:ConversationModel.prototype,},})
return __exports;});;
odoo.define('@717da89923407d2bbdeadd4f99b9e8918889493cac89cdeb293e1e42f46b02fa',async function(require){'use strict';let __exports={};const{Message}=require('@cd88eb6ddbd39307a4d8acd1cff882374d40d987a801fff227eb08b73df94690')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{Component,onWillDestroy,useRef,onWillUpdateProps,onPatched,onMounted}=owl
const ConversationThread=__exports.ConversationThread=class ConversationThread extends Component{setup(){super.setup()
this.env;this.props;this.threadRef=useRef('threadRef')
this.env.chatBus.on('productDragInit',this,()=>{this.threadRef.el.classList.add('drop-active')})
this.env.chatBus.on('productDragging',this,({x,y})=>{if(this.isInside(x,y)){this.threadRef.el.classList.add('drop-hover')}else{this.threadRef.el.classList.remove('drop-hover')}})
this.env.chatBus.on('productDragEnd',this,()=>{this.threadRef.el.classList.remove('drop-active')
this.threadRef.el.classList.remove('drop-hover')})
this.env.chatBus.on('productDrop',this,async({x,y,product})=>{if(this.isInside(x,y)&&this.props.selectedConversation&&this.props.selectedConversation.isMine()){await this.props.selectedConversation.sendProduct(product.id)}})
this.env.chatBus.on('scrollToMessage',this,({message})=>this.messageToScroll=message)
this.env.chatBus.on('inmediateScrollToMessage',this,this.scrollToMessage)
this.firstScroll=true
this.loadMoreMessage=false
this.scrollToPrevMessage=null
this.messageToScroll=null
onWillUpdateProps(this.willUpdateProps.bind(this))
onMounted(this.checkScroll.bind(this))
onPatched(this.checkScroll.bind(this))
onWillDestroy(this.destroy.bind(this))}
destroy(){this.env.chatBus.off('productDragInit',this)
this.env.chatBus.off('productDragEnd',this)
this.env.chatBus.off('productDragging',this)
this.env.chatBus.off('productDrop',this)
this.env.chatBus.off('scrollToMessage',this)
this.env.chatBus.off('inmediateScrollToMessage',this)}
async willUpdateProps(){this.loadMoreMessage=false
this.firstScroll=true
this.scrollToPrevMessage=null}
checkScroll(){if(this.props.selectedConversation){if(this.messageToScroll){this.scrollToMessage({message:this.messageToScroll})
this.messageToScroll=null}else if(this.scrollToPrevMessage){this.scrollToPrevMessage()
this.scrollToPrevMessage=null}else{if(this.needScroll()||this.firstScroll){this.scrollConversation()
this.firstScroll=false}}
this.loadMoreMessage=true}}
isInside(x,y){let out
const rect=this.threadRef.el.getBoundingClientRect()
if(rect.top<=y&&y<=rect.bottom){out=rect.left<=x&&x<=rect.right}else{out=false}
return out}
needScroll(){const scollPosition=this.calculateScrollPosition()
return scollPosition>=0.7}
calculateScrollPosition(){let scrollPosition=0
if(this.threadRef.el){const scrollTop=this.threadRef.el.scrollTop
const scrollHeight=this.threadRef.el.scrollHeight
const clientHeight=this.threadRef.el.clientHeight
scrollPosition=(scrollTop+clientHeight)/scrollHeight}
return scrollPosition}
scrollConversation(){if(this.threadRef.el){const list=this.threadRef.el.querySelectorAll('.acrux_Message')
if(list.length){const lastMessage=list[list.length-1]
if(lastMessage){setTimeout(()=>lastMessage.scrollIntoView({block:'nearest',inline:'start'}),30)}}}}
scrollToMessage({message,effect,className}){if(this.threadRef.el){const element=document.querySelector(`.acrux_Message[data-id="${message.id}"]`)
if(element){element.scrollIntoView({block:'nearest',inline:'start'})
if(effect==='blink'&&className){setTimeout(()=>element.classList.add('active_quote'),400)
setTimeout(()=>element.classList.remove('active_quote'),800)
setTimeout(()=>element.classList.add('active_quote'),1200)
setTimeout(()=>element.classList.remove('active_quote'),1600)}}}}
async syncMoreMessage(){if(this.props.selectedConversation&&this.loadMoreMessage&&this.threadRef.el&&this.threadRef.el.scrollTop===0){const message=this.threadRef.el.querySelector('.acrux_Message')
const size=this.props.selectedConversation.messages.length
await this.props.selectedConversation.syncMoreMessage()
if(message&&this.props.selectedConversation.messages.length>size){this.scrollToPrevMessage=()=>message.scrollIntoView()}}}}
Object.assign(ConversationThread,{template:'chatroom.ConversationThread',props:{selectedConversation:ConversationModel.prototype,},components:{Message}})
return __exports;});;
odoo.define('@db85d529c7bfe389fdf15fba7fac9a7ed7d8b33a6bae85cb02ff638f64b2630d',async function(require){'use strict';let __exports={};const{WarningDialog}=require('@web/core/errors/error_dialogs')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{DefaultAnswerModel}=require('@691be66bc681670fb0cd11c07adec04e8dfc38741d2ef37bf718faf4dab4f3b1')
const{Component}=owl
const DefaultAnswer=__exports.DefaultAnswer=class DefaultAnswer extends Component{setup(){super.setup()
this.env
this.props}
async sendAnswer(event){let out=Promise.resolve()
if(event){event.target.disabled=true}
if(this.props.selectedConversation&&this.props.selectedConversation.isMine()){let text,ttype=this.props.defaultAnswer.ttype
if(ttype==='code'){ttype='text'
text=await this.env.services.orm.call('acrux.chat.default.answer','eval_answer',[[this.props.defaultAnswer.id],this.props.selectedConversation.id],{context:this.env.context})}else{if(this.props.defaultAnswer.text&&''!==this.props.defaultAnswer.text){text=this.props.defaultAnswer.text}else{text=this.props.defaultAnswer.name}}
const options={from_me:true,text:text,ttype:ttype,res_model:this.props.defaultAnswer.resModel,res_id:this.props.defaultAnswer.resId,button_ids:this.props.defaultAnswer.buttons.map(btn=>{const btn2={...btn}
delete btn2.id
return btn2}),chat_list_id:this.props.defaultAnswer.chatListRecord}
out=this.props.selectedConversation.createMessage(options)}else{this.env.services.dialog.add(WarningDialog,{message:this.env._t('You must select a conversation.')})}
return out.finally(()=>{if(event){event.target.disabled=false}})}}
Object.assign(DefaultAnswer,{template:'chatroom.DefaultAnswer',props:{selectedConversation:ConversationModel.prototype,defaultAnswer:DefaultAnswerModel.prototype,},})
return __exports;});;
odoo.define('@77841dc469b48ca608b4d7a840d74ad5a4605d44519882a2a029ac38f196c9ba',async function(require){'use strict';let __exports={};const{Component}=owl
const Emojis=__exports.Emojis=class Emojis extends Component{setup(){super.setup()
this.env
this.data=['😁','😂','😃','😄','😅','😆','😇','😈','😉','😊','😋','😌','😍','😎','😏','😐','😑','😒','😓','😔','😕','😖','😗','😘','😙','😚','😛','😜','😝','😞','😟','😠','😡','😢','😣','😤','😥','😦','😧','😨','😩','😪','😫','😬','😭','😮','😯','😰','😱','😲','😳','😴','😵','😶','😷','😸','😹','😺','😻','😼','😽','😾','😿','🙀','🙁','🙂','🙃','🙄','🙅','🙆','🙇','🙈','🙉','🙊','🙋','🙌','🙍','🙎','🙏','👀','👁','👂','👃','👄','👅','👆','👇','👈','👉','👊','👋','👌','👍','👎','👏','👐','👦','👧','👨','👩','👪','👫','👬','👭','👺','👻','👼','👽','👾','👿','💀','💁','😀','❤️','💓','💔','💘','💩','💪','💵','🐞','🐻','🐌','🐗','🍀','🌹','🔥','☀️','⛅️','🌈','☁️','⚡️','⭐️','🍪','🍕','🍔','🍟','🎂','🍰','☕️','🍌','🍣','🍙','🍺','🍷','🍸','🍹','🍻','🎉','🏆','🔑','📌','📯','🎵','🎺','🎸','🏃','🚲','⚽️','🏈','🎱','🎬','🎤','🧀']}
onClick(event){const startPos=this.props.inputRef.selectionStart;const endPos=this.props.inputRef.selectionEnd;const firstText=this.props.inputRef.value.substring(0,startPos)
const lastText=this.props.inputRef.value.substring(endPos,this.props.inputRef.value.length)
const text=event.target.dataset.source
this.props.setInputText(`${firstText}${text}${lastText}`)
this.props.inputRef.selectionStart=startPos+text.length
this.props.inputRef.selectionEnd=startPos+text.length}
onMouseLeave(){this.props.close()}}
Object.assign(Emojis,{template:'chatroom.Emojis',props:{inputRef:HTMLElement,close:Function,setInputText:Function,}})
return __exports;});;
odoo.define('@457d9b839da08ca4cb3b6bfb5fcdb838808477c5a3cab87d27ce049700f78a28',async function(require){'use strict';let __exports={};const{ChatroomHeader}=require('@54b543691528c8f74a0ea8c47d8a8d71f5d481321088b43516787400b97b1a59')
const{ChatSearch}=require('@b776165a95553fcc22eda64dc09cd1e02d2db4727ab51cf648290a373a0251c6')
const{ConversationCard}=require('@0834dd1040d7a3b188437dce6ad6f011757b7e8b052b9d8ccdeab7e03abe8763')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{UserModel}=require('@6e344e9f6e92958c137d3f0fd12f4b185e994c729e92e763551752e4b953217a')
const{Component,onWillDestroy,useState}=owl
const InitConversation=__exports.InitConversation=class InitConversation extends Component{setup(){super.setup()
this.env;this.props;this.state=useState({convList:[]})
this.placeHolder=this.env._t('Search')
this.env.chatBus.on('searchConversation',this,this.searchConversation)
this.env.chatBus.on('initAndNotifyConversation',this,this.initAndNotify)
this.env.chatBus.on('updateConversation',this,this.update)
onWillDestroy(this.destroy.bind(this))}
destroy(){this.env.chatBus.off('searchConversation',this)
this.env.chatBus.off('initAndNotifyConversation',this)
this.env.chatBus.off('updateConversation',this)}
async update(newConv){let conv=this.state.convList.find(conv=>conv.id==newConv.id)
if(conv){conv.updateFromJson(newConv)
await conv.buildExtraObj()}}
getSearchDomain(val){return['|','|',['name','ilike',val],['number_format','ilike',val],['number','ilike',val]];}
async searchConversation({search}){let val=search||'',domain
if(val&&''!=val.trim()){domain=this.getSearchDomain(val)}else{domain=[]}
const result=await this.env.services.orm.searchRead(this.env.chatModel,domain,this.props.conversationUsedFields,{context:this.env.context,limit:100})
this.state.convList=result.map(conv=>new ConversationModel(this,conv))}
async initAndNotify({id}){return this.env.services.orm.call(this.env.chatModel,'init_and_notify',[[id]],{context:this.env.context},)}
async createConversation(){let action={type:'ir.actions.act_window',name:this.env._t('Create'),view_type:'form',view_mode:'form',res_model:this.env.chatModel,views:[[false,'form']],target:'new',context:{...this.env.context,chat_full_edit:true},}
const onSave=async record=>{if(record?.data?.id){await Promise.all([this.env.services.action.doAction({type:'ir.actions.act_window_close'}),this.searchConversation({}),this.initAndNotify({id:record.data.id,fromCreateConversation:true}),])}}
await this.env.services.action.doAction(action,{props:{onSave}})}}
Object.assign(InitConversation,{template:'chatroom.InitConversation',props:{conversationUsedFields:{type:Array,element:String,},user:UserModel.prototype,},components:{ChatSearch,ConversationCard,ChatroomHeader,}})
return __exports;});;
odoo.define('@cd88eb6ddbd39307a4d8acd1cff882374d40d987a801fff227eb08b73df94690',async function(require){'use strict';let __exports={};const{getMessagingComponent}=require('@mail/utils/messaging_component')
const{MessageModel}=require('@7020aa6e3d62fd1ef5722ab7283652cd994893657d2f6d64c48687221ccf4d2a')
const{AudioPlayer}=require('@a0ab5b871d0b9b4e8f7af01774f6c90121c5c8605b6df6e2afa06745132533d4')
const{MessageMetadata}=require('@c0e35d47c5c44a12e21a6d4f7b53b24ed5c4dfb95bc5c53e3d53f6a59d71a8d5')
const{Component}=owl
const Message=__exports.Message=class Message extends Component{setup(){super.setup()
this.env;this.props;}
messageCssClass(){const list=this.messageCssClassList()
return list.join(' ')}
messageCssClassList(){return[]}
async onTranscribe(){const{orm}=this.env.services
const data=await orm.call('acrux.chat.message','transcribe',[[this.props.message.id],this.env.canTranscribe()],{context:this.env.context})
this.props.message.transcription=data}}
Object.assign(Message,{template:'chatroom.Message',props:{message:MessageModel.prototype,},components:{AttachmentImage:getMessagingComponent('AttachmentImage'),AttachmentCard:getMessagingComponent('AttachmentCard'),AudioPlayer,MessageMetadata,}})
return __exports;});;
odoo.define('@c0e35d47c5c44a12e21a6d4f7b53b24ed5c4dfb95bc5c53e3d53f6a59d71a8d5',async function(require){'use strict';let __exports={};const{AudioPlayer}=require('@a0ab5b871d0b9b4e8f7af01774f6c90121c5c8605b6df6e2afa06745132533d4')
const{Component,onWillUpdateProps,onWillStart}=owl
const MessageMetadata=__exports.MessageMetadata=class MessageMetadata extends Component{setup(){super.setup()
this.env;this.props;this.data={}
onWillStart(this.willStart.bind(this))
onWillUpdateProps(this.willUpdateProps.bind(this))}
async willStart(){this.computeProps(this.props)}
async willUpdateProps(nextProps){this.computeProps(nextProps)}
computeProps(props){const data=JSON.parse(props.metadataJson)
data.title=data.title||''
data.body=data.body||''
this.data=data}
openExternalLink(){if(this.data.url){window.open(this.data.url,'_blank')}}
get audioObj(){return{src:this.data?.media?.url}}
get urlPreview(){return this.data?.media?.url}
get extraClass(){return''}}
Object.assign(MessageMetadata,{template:'chatroom.MessageMetadata',props:{type:String,metadataJson:String,},components:{AudioPlayer}})
return __exports;});;
odoo.define('@7a62dfdb759d304a7edb10d42c865e22f111680eec0dd98093f1f375ab0785ab',async function(require){'use strict';let __exports={};const{formatMonetary}=require('@web/views/fields/formatters')
const{ProductModel}=require('@a57f7a72eb29be2e68a9675edd680394d67e2ecd8df85dc2c38e83822c8551e8')
const{Component}=owl
const Product=__exports.Product=class Product extends Component{setup(){super.setup()
this.env;}
formatPrice(price){return formatMonetary(price,{currencyId:this.env.getCurrency()})}
productOption(event){this.env.chatBus.trigger('productOption',{product:this.props.product,event})}}
Object.assign(Product,{template:'chatroom.Product',props:{product:ProductModel.prototype}})
return __exports;});;
odoo.define('@aedb85b64f8970ed4ccdcfb5fad7484eb5f9502792073b672b574c2d95ef5fe2',async function(require){'use strict';let __exports={};const{WarningDialog}=require('@web/core/errors/error_dialogs')
const{ChatroomHeader}=require('@54b543691528c8f74a0ea8c47d8a8d71f5d481321088b43516787400b97b1a59')
const{ProductHeader}=require('@5ae567b0e40ee2ceb7a5024e5bb53febd30d158068d3a851a389f0159ace7530')
const{Product}=require('@7a62dfdb759d304a7edb10d42c865e22f111680eec0dd98093f1f375ab0785ab')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{ProductModel}=require('@a57f7a72eb29be2e68a9675edd680394d67e2ecd8df85dc2c38e83822c8551e8')
const{Component,onWillDestroy,useState}=owl
const ProductContainer=__exports.ProductContainer=class ProductContainer extends Component{setup(){super.setup()
this.env;this.state=useState({products:[]})
this.env.chatBus.on('productSearch',this,this.searchProduct)
this.env.chatBus.on('productOption',this,this.productOption)
onWillDestroy(this.destroy.bind(this))}
destroy(){this.env.chatBus.off('productSearch',this)
this.env.chatBus.off('productOption',this)}
async searchProduct({search}){let val=search||''
const{orm}=this.env.services
const result=await orm.call(this.env.chatModel,'search_product',[val.trim()],{context:this.env.context})
this.state.products=result.map(product=>new ProductModel(this,product))}
async productOption({product,event}){if(this.props.selectedConversation){if(this.props.selectedConversation.isMine()){await this.doProductOption({product,event})}else{this.env.services.dialog.add(WarningDialog,{message:this.env._t('Yoy are not writing in this conversation.')})}}else{this.env.services.dialog.add(WarningDialog,{message:this.env._t('You must select a conversation.')})}}
async doProductOption({product}){await this.props.selectedConversation.sendProduct(product.id)
this.env.chatBus.trigger('mobileNavigate','middleSide')}}
Object.assign(ProductContainer,{template:'chatroom.ProductContainer',props:{selectedConversation:ConversationModel.prototype,className:{type:String,optional:true}},defaultProps:{className:''},components:{ChatroomHeader,ProductHeader,Product,}})
return __exports;});;
odoo.define('@5ae567b0e40ee2ceb7a5024e5bb53febd30d158068d3a851a389f0159ace7530',async function(require){'use strict';let __exports={};const{ChatSearch}=require('@b776165a95553fcc22eda64dc09cd1e02d2db4727ab51cf648290a373a0251c6')
const{Component}=owl
const ProductHeader=__exports.ProductHeader=class ProductHeader extends Component{setup(){super.setup()
this.env;this.placeHolder=this.env._t('Search Products')}
mobileNavigate(){this.env.chatBus.trigger('mobileNavigate','middleSide')}}
Object.assign(ProductHeader,{template:'chatroom.ProductHeader',props:{eventName:String,},components:{ChatSearch},})
return __exports;});;
odoo.define('@af0df1a5affde864bfaca0edba19137ac4e7199f2cb7ae310c45d7b47aaac68b',async function(require){'use strict';let __exports={};const{Notebook}=require('@acbad003049675bb72f8aa048c5505a3b1ff288c3fd1edf91e41bc101c8deb3e')
const{DefaultAnswer}=require('@db85d529c7bfe389fdf15fba7fac9a7ed7d8b33a6bae85cb02ff638f64b2630d')
const{ConversationForm}=require('@d3310142513a60875a36765d19fdb3dd7b162511bc1eeda32ca1cd870284e772')
const{ConversationKanban}=require('@6b827bd088194ec1bd28907241858b132687b2745bb08d69a01a07dbdc7f175f')
const{AiIntefaceForm}=require('@40aca894c21e4515549a3a5d23148601f5e3b684104bff0b1e4c01d5a8c39741')
const{PartnerForm}=require('@30bcd30850cd19012d4f3f579cc45e01e3d534df66b8203139cb8a307d419749')
const{InitConversation}=require('@457d9b839da08ca4cb3b6bfb5fcdb838808477c5a3cab87d27ce049700f78a28')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{DefaultAnswerModel}=require('@691be66bc681670fb0cd11c07adec04e8dfc38741d2ef37bf718faf4dab4f3b1')
const{UserModel}=require('@6e344e9f6e92958c137d3f0fd12f4b185e994c729e92e763551752e4b953217a')
const{Component,onWillUpdateProps,onWillStart,onWillDestroy}=owl
const TabsContainer=__exports.TabsContainer=class TabsContainer extends Component{setup(){super.setup()
this.env;this.props
onWillStart(this.willStart.bind(this))
onWillUpdateProps(this.willUpdateProps.bind(this))
onWillDestroy(this.destroy.bind(this))
this.comp={ConversationForm,PartnerForm,ConversationKanban,AiIntefaceForm,}
this.compProps={}
this.env.chatBus.on('updateConversation',this,()=>{this.computeFormProps(this.props)
this.render()})
this.env.chatBus.on('updateTab',this,()=>{this.computeFormProps(this.props)
this.render()})}
async willStart(){this.computeFormProps(this.props)}
async willUpdateProps(nextProps){this.computeFormProps(nextProps)}
destroy(){this.env.chatBus.off('updateConversation',this)
this.env.chatBus.off('updateTab',this)}
computeFormProps(props){this.compProps.ConversationForm=this.getTabInfoProps(props)
this.compProps.PartnerForm=this.getTabPartnerProps(props)
this.compProps.ConversationKanban=this.getTabConversationKanbanProps(props)
this.compProps.AiIntefaceForm=this.getTabAiIntefaceFormProps(props)}
getTabInfoProps(nextProps){return{viewId:nextProps.conversationInfoForm,viewTitle:this.env._t('Info'),viewResId:nextProps?.selectedConversation?.id,}}
getTabPartnerProps(nextProps){return{viewTitle:this.env._t('Partner'),viewResId:nextProps?.selectedConversation?.partner?.id,selectedConversation:nextProps?.selectedConversation,searchButton:true,searchButtonString:this.env._t('Match with Existing Partner'),}}
getTabConversationKanbanProps(nextProps){return{viewId:nextProps.conversationKanban,viewTitle:this.env._t('Status'),formViewId:nextProps.conversationInfoForm,}}
getTabAiIntefaceFormProps(nextProps){return{viewId:nextProps.aiIntefaceForm,viewTitle:this.env._t('AI'),selectedConversation:nextProps?.selectedConversation,}}}
Object.assign(TabsContainer,{template:'chatroom.TabsContainer',props:{selectedConversation:ConversationModel.prototype,updateTab:Function,defaultAnswers:{type:Array,element:DefaultAnswerModel.prototype,},conversationUsedFields:{type:Array,element:String,},conversationInfoForm:{type:Number,optional:true},conversationKanban:{type:Number,optional:true},aiIntefaceForm:{type:Number,optional:true},className:{type:String,optional:true,},tabSelected:{type:String,optional:true},user:UserModel.prototype,},defaultProps:{className:''},components:{Notebook,DefaultAnswer,InitConversation,ConversationForm,PartnerForm,ConversationKanban,AiIntefaceForm,},})
return __exports;});;
odoo.define('@c011635ccdcd3301f40c07724a28d782d0f498e544a6747890cf878476644d9c',async function(require){'use strict';let __exports={};const{CheckBox}=require('@web/core/checkbox/checkbox')
const{Emojis}=require('@77841dc469b48ca608b4d7a840d74ad5a4605d44519882a2a029ac38f196c9ba')
const{AttachmentUpload}=require('@823cc1a7e61fd78e5058a6cd3f3004f796bbcf6fd6d7c45b7368b77e32deee31')
const{ConversationModel}=require('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef')
const{UserModel}=require('@6e344e9f6e92958c137d3f0fd12f4b185e994c729e92e763551752e4b953217a')
const{Component,useRef,onWillDestroy}=owl
const Toolbox=__exports.Toolbox=class Toolbox extends Component{setup(){super.setup()
this.env
this.props
const AttachmentList=this.env.services.messaging.modelManager.models.AttachmentList
this.attachList=AttachmentList.insert({isAcrux:true,acruxMessageId:-1})
this.inputRef=useRef('inputRef')
this.emojisBtnRef=useRef('emojisBtnRef')
this.sendBtnRef=useRef('sendBtnRef')
this.attachBtnRef=useRef('attachBtnRef')
this.toolboxContainerRef=useRef('toolboxContainerRef')
this.releaseBtnRef=useRef('releaseBtnRef')
this.env.chatBus.on('attachCreated',this,this.enableDisplabeAttachBtn)
this.env.chatBus.on('attachRemoved',this,this.enableDisplabeAttachBtn)
this.env.chatBus.on('setInputText',this,this.setInputText)
onWillDestroy(this.destroy.bind(this))}
destroy(){this.env.chatBus.off('attachCreated',this)
this.env.chatBus.off('attachRemoved',this)
this.env.chatBus.off('setInputText',this)}
get conversationMine(){return this.props.selectedConversation?.isMine()?'':'d-none'}
get conversationNotMine(){return this.props.selectedConversation?.isMine()?'d-none':''}
get allowSign(){const{selectedConversation:conv}=this.props
return(conv?.isMine()&&conv.allowSigning?'':'d-none')}
async blockClient(){if(this.props.selectedConversation){try{await this.props.selectedConversation.block()
this.env.chatBus.trigger('orderConversations')}catch(_e){this.env.chatBus.trigger('deleteConversation',this.props.selectedConversation)}}}
async releaseClient(){if(this.props.selectedConversation?.isMine()){await this.props.selectedConversation.release()
this.env.chatBus.trigger('deleteConversation',this.props.selectedConversation)}}
async sendMessage(event){this.inputRef.el.disabled=true
this.sendBtnRef.el.disabled=true
const outMessages=[]
let options={from_me:true}
let text=this.inputRef.el.value.trim()
const attachments=[...this.attachList.attachments]
if(event){event.preventDefault()
event.stopPropagation()}
if(''!=text){options.ttype='text'
options.text=text}
if(attachments.length){const attachment=attachments.shift()
options=this.setAttachmentValues2Message(options,attachment)}
try{this.env.services.ui.block()
if(options.ttype){options=this.sendMessageHook(options)
outMessages.push(await this.props.selectedConversation.createMessage(options))
text=''
for await(const attachment of attachments){options=this.setAttachmentValues2Message({from_me:true},attachment)
options=this.sendMessageHook(options)
outMessages.push(await this.props.selectedConversation.createMessage(options))}}}finally{this.env.chatBus.trigger('updateAttachmentUI')
this.env.chatBus.trigger('orderConversations')
this.enableDisplabeAttachBtn()
this.inputRef.el.disabled=false
this.sendBtnRef.el.disabled=false
this.setInputText(text)
this.env.services.ui.unblock()}
return outMessages}
setAttachmentValues2Message(options,attachment){if(attachment.mimetype.includes('image')){options.ttype='image'}else if(attachment.mimetype.includes('audio')){options.ttype='audio'}else if(attachment.mimetype.includes('video')){options.ttype='video'}else{options.ttype='file'}
options.res_model='ir.attachment'
options.res_id=attachment.id
options.res_model_obj=attachment
return options}
sendMessageHook(options){return options}
onKeypress(event){if(event.which===13&&!event.shiftKey){event.preventDefault();event.stopPropagation();this.sendMessage();}}
onKeydown(){}
onInput(event){const{target:textarea}=event
textarea.style.height='auto'
const newHeight=textarea.scrollHeight-(textarea.offsetHeight-textarea.clientHeight)
textarea.style.height=Math.min(newHeight,250)+'px';textarea.style.overflow=(newHeight>250)?'auto':'hidden'}
onPaste(event){let clipboardData=event.clipboardData||window.clipboardData;if(clipboardData){const items=clipboardData.items
const files=[]
for(let index in items){const item=items[index];if(item.kind==='file'){event.stopPropagation();event.preventDefault();files.push(item.getAsFile())}}
if(files.length){this.env.chatBus.trigger('uploadAttachment',files)}}}
toggleEmojis(){if(this.popoverCloseFn){this.popoverCloseFn()
this.popoverCloseFn=null}else{this.popoverCloseFn=this.env.services.popover.add(this.emojisBtnRef.el,Emojis,{inputRef:this.inputRef.el,setInputText:this.setInputText.bind(this),close:()=>{if(this.popoverCloseFn){this.popoverCloseFn()
this.popoverCloseFn=null}}},{position:'top'})}}
async updateSigning(newValue){await this.updateUserPreference({chatroom_signing_active:newValue})
this.props.user.signingActive=newValue}
async updateUserPreference(preference){await this.env.services.orm.write('res.users',[this.env.services.user.userId],preference,{context:this.env.context})}
addAttachment(){this.env.chatBus.trigger('initAttachment')}
needDisableInput(attachment){return!(attachment.mimetype.includes('image')||attachment.mimetype.includes('video'))}
enableDisplabeAttachBtn(){if(this.attachList.attachments.length){const attachment=this.attachList.attachments[0]
if(this.needDisableInput(attachment)){this.setInputText('')
this.inputRef.el.disabled=true
this.emojisBtnRef.el.disabled=true}else{this.inputRef.el.disabled=false
this.emojisBtnRef.el.disabled=false}}else{this.emojisBtnRef.el.disabled=false
this.inputRef.el.disabled=false
this.inputRef.el.focus()}}
setInputText(text){if(!(this.inputRef.el.disabled||this.inputRef.el.readonly)){this.inputRef.el.value=text
this.onInput({target:this.inputRef.el})}}}
Object.assign(Toolbox,{template:'chatroom.Toolbox',props:{user:UserModel.prototype,selectedConversation:ConversationModel.prototype,},components:{CheckBox,Emojis,AttachmentUpload,}})
return __exports;});;
odoo.define('@3c9d8b38fc49fa01016356514efedc5b76852938fc0e4643ad7b690072d10b96',async function(require){'use strict';let __exports={};const{UserModel}=require('@6e344e9f6e92958c137d3f0fd12f4b185e994c729e92e763551752e4b953217a')
const{Component}=owl
const UserStatus=__exports.UserStatus=class UserStatus extends Component{setup(){super.setup()
this.env;this.props}
async onActive(){await this.changeStatus({status:true})}
async onInactive(){await this.changeStatus({status:false})}
async changeStatus({status}){if(status!==this.props.user.status){const{orm,user}=this.env.services
await orm.call('res.users','set_chat_active',[[user.userId],{acrux_chat_active:status}],{context:this.env.context})
this.env.chatBus.trigger('updateUserStatus',{status})}}}
Object.assign(UserStatus,{template:'chatroom.UserStatus',props:{user:UserModel.prototype}})
return __exports;});;
odoo.define('@3c372604289611a498f68f71210a86a252c33aeb332b42905c018f29098599ca',async function(require){'use strict';let __exports={};const ChatBaseModel=__exports.ChatBaseModel=class ChatBaseModel{constructor(comp){this.env=comp.env}
updateFromJson(){}
async buildExtraObj(){}
convertRecordField(record,extraFields){let out
if(record){out={id:record[0],name:record[1]}
for(let i=2,j=0;i<record.length&&j<extraFields.length;++i,++j){out[extraFields[j]]=record[i]}}else{out={id:0,name:''}
if(extraFields){for(const extraField of extraFields){out[extraField]=''}}}
return out}
convertFieldRecord(record,extraFields){let out=[0,'']
if(record){out=[record.id,record.name]
for(const extraField of extraFields){out.push(record[extraField])}}else{extraFields.forEach(()=>out.push(''))}
return out}}
return __exports;});;
odoo.define('@e71c685495b3fd5a77d050fe9a0ee4564da20c118bd360ce54260886e1bb13ef',async function(require){'use strict';let __exports={};const{ChatBaseModel}=require('@3c372604289611a498f68f71210a86a252c33aeb332b42905c018f29098599ca')
const{MessageModel}=require('@7020aa6e3d62fd1ef5722ab7283652cd994893657d2f6d64c48687221ccf4d2a')
const{deserializeDateTime}=require('@web/core/l10n/dates')
const ConversationModel=__exports.ConversationModel=class ConversationModel extends ChatBaseModel{constructor(comp,base){super(comp)
this.env
this.id=0
this.name=''
this.numberFormat=''
this.status='new'
this.borderColor='#FFFFFF'
this.imageUrl=''
this.team={id:0,name:''}
this.partner={id:0,name:''}
this.agent={id:0,name:''}
this.connector={id:0,name:''}
this.connectorType=''
this.showIcon=false
this.allowSigning=false
this.assigned=false
this.messages=[]
this.messagesIds=new Set()
this.countNewMsg=0
this.lastActivity=luxon.DateTime.now()
this.tagIds=[]
this.note=''
if(base){this.updateFromJson(base)}}
updateFromJson(base){super.updateFromJson(base)
if('id'in base){this.id=base.id}
if('name'in base){this.name=base.name}
if('number_format'in base){this.numberFormat=base.number_format}
if('status'in base){this.status=base.status}
if('border_color'in base){this.borderColor=base.border_color}
if('image_url'in base){this.imageUrl=base.image_url}
if('team_id'in base){this.team=this.convertRecordField(base.team_id)}
if('res_partner_id'in base){this.partner=this.convertRecordField(base.res_partner_id)}
if('agent_id'in base){this.agent=this.convertRecordField(base.agent_id)}
if('connector_id'in base){this.connector=this.convertRecordField(base.connector_id)}
if('connector_type'in base){this.connectorType=base.connector_type}
if('show_icon'in base){this.showIcon=base.show_icon}
if('allow_signing'in base){this.allowSigning=base.allow_signing}
if('assigned'in base){this.assigned=base.assigned}
if('messages'in base){this.updateMessages(base.messages)}
if('last_activity'in base){this.lastActivity=deserializeDateTime(base.last_activity)}
if('tag_ids'in base){this.tagIds=base.tag_ids}
if('note'in base){this.note=base.note}}
async buildExtraObj(){await super.buildExtraObj()
for await(const msg of this.messages){await msg.buildExtraObj()}}
async setMessages(messages){this.messagesIds=new Set();if(messages&&messages instanceof Array){if(messages.length>0){if(messages[0]instanceof MessageModel){this.messages=messages
this.messagesIds=new Set(this.messages.map(msg=>msg.id))}else{this.messages=[];await this.appendMessages(messages)}}else{this.messages=[];}}else{this.messages=[];}
this.calculateMessageCount()}
async appendMessages(messages){if(messages){messages=messages.filter(msg=>!this.messagesIds.has(msg.id))
if(messages.length){const newMessages=messages.map(msg=>new MessageModel(this,msg))
await Promise.all(newMessages.map(msg=>msg.buildExtraObj()))
this.messages.push(...newMessages)
for(const msg of newMessages){this.messagesIds.add(msg.id)}
this.calculateMessageCount()}}}
async prependMessages(messages){if(messages){messages=messages.filter(msg=>!this.messagesIds.has(msg.id))
if(messages.length){const newMessages=messages.map(msg=>new MessageModel(this,msg))
await Promise.all(newMessages.map(msg=>msg.buildExtraObj()))
this.messages.unshift(...newMessages)
for(const msg of newMessages){this.messagesIds.add(msg.id)}
this.calculateMessageCount()}}}
updateMessages(messages){if(messages&&this.messages&&this.messages.length){for(const msg of messages){const msgFound=this.messages.find(m=>m.id===msg.id)
if(msgFound){msgFound.updateFromJson(msg)}}}}
calculateMessageCount(){if(['new','current'].includes(this.status)){const messages=this.messages.filter(msg=>!msg.ttype.startsWith('info'))
let lastIndexOf
if(Array.prototype.findLastIndex){lastIndexOf=messages.findLastIndex(msg=>msg.fromMe)}else{lastIndexOf=messages.map(msg=>msg.fromMe).lastIndexOf(true)}
this.countNewMsg=messages.length-(lastIndexOf+1)}else{this.countNewMsg=0}}
async syncMoreMessage(){if(this.messages.length>=22){const result=await this.env.services.orm.call(this.env.chatModel,'build_dict',[[this.id]],{context:this.env.context,limit:22,offset:this.messages.length})
await this.prependMessages(result[0].messages)}}
async createMessage(options){const msg=new MessageModel(this,options)
const jsonData=msg.exportToVals()
if(options.custom_field){jsonData[options.custom_field]=true}
const result=await this.env.services.orm.call(this.env.chatModel,'send_message',[[this.id],jsonData],{context:this.env.context})
msg.updateFromJson(result[0])
await msg.buildExtraObj()
msg.createNewAttachList()
this.messages.push(msg)
this.messagesIds.add(msg.id)
this.lastActivity=luxon.DateTime.now()
this.env.chatBus.trigger('mobileNavigate','middleSide')
this.calculateMessageCount()
return msg}
async sendProduct(productId){await this.env.services.orm.call(this.env.chatModel,'send_message_product',[[this.id],parseInt(productId)],{context:this.env.context})}
async messageSeen(){await this.env.services.orm.silent.call(this.env.chatModel,'conversation_send_read',[[this.id]],{context:this.env.context})}
isMine(){return(this.status==='current'&&this.agent.id&&this.agent.id===this.env.services.user.userId)}
getIconClass(){let out=''
if(['apichat.io','chatapi','gupshup'].includes(this.connectorType)){out='acrux_whatsapp'}
else if(this.connectorType==='facebook'){out='acrux_messenger'}
else if(this.connectorType==='instagram'){out='acrux_instagram'}
return out}
async block(){const conv=await this.env.services.orm.call(this.env.chatModel,'block_conversation',[this.id],{context:this.env.context})
this.updateFromJson(conv[0])
this.messageSeen()
this.assigned=false}
async release(){await this.env.services.orm.call(this.env.chatModel,'release_conversation',[this.id],{context:this.env.context})}
get lastMessage(){let out=null
if(this.messages.length){const messages=this.messages.filter(msg=>msg.ttype!=='info')
if(messages.length){out=messages[messages.length-1]}}
return out}
async selected(){if(this.isMine()){this.messageSeen()}
this.assigned=false}}
return __exports;});;
odoo.define('@691be66bc681670fb0cd11c07adec04e8dfc38741d2ef37bf718faf4dab4f3b1',async function(require){'use strict';let __exports={};const{MessageBaseModel}=require('@9f550e3a7c92bb06c3fddba4f99a7b9e71b1ac051716574055e7bf82d8432aaf')
const DefaultAnswerModel=__exports.DefaultAnswerModel=class DefaultAnswerModel extends MessageBaseModel{constructor(comp,base){super(comp)
this.env
this.name=''
this.sequence=0
if(base){this.updateFromJson(base)}}
updateFromJson(base){super.updateFromJson(base)
if('name'in base){this.name=base.name}
if('sequence'in base){this.sequence=base.sequence}}}
return __exports;});;
odoo.define('@7020aa6e3d62fd1ef5722ab7283652cd994893657d2f6d64c48687221ccf4d2a',async function(require){'use strict';let __exports={};const{deserializeDateTime,formatDateTime,formatDate,serializeDateTime}=require('@web/core/l10n/dates')
const{MessageBaseModel}=require('@9f550e3a7c92bb06c3fddba4f99a7b9e71b1ac051716574055e7bf82d8432aaf')
const{link,unlink}=require('@mail/model/model_field_command')
const{markup}=owl
const MessageModel=__exports.MessageModel=class MessageModel extends MessageBaseModel{constructor(comp,base){super(comp)
this.env
this.conversation=comp
this.fromMe=false
this.errorMsg=''
this.showProductText=false
this.dateMessage=luxon.DateTime.now()
this.location=null
this.resModelObj=null
this.titleColor='#000000'
this.metadataType=null
this.metadataJson=null
this.createUid={id:0,name:''}
this.transcription=null
if(base){this.updateFromJson(base)}}
updateFromJson(base){super.updateFromJson(base)
if('from_me'in base){this.fromMe=base.from_me}
if('error_msg'in base){this.errorMsg=base.error_msg}
if('show_product_text'in base){this.showProductText=base.show_product_text}
if('res_model_obj'in base){this.resModelObj=base.res_model_obj}
if('date_message'in base){this.dateMessage=base.date_message
if(this.dateMessage){this.convertDate('dateMessage')}}
if(this.ttype=='location'){this.createLocationObj();}
if('title_color'in base){this.titleColor=base.title_color
this.titleColor=this.titleColor!='#FFFFFF'?this.titleColor:'#000000'}
if('metadata_type'in base){this.metadataType=base.metadata_type}
if('metadata_json'in base){this.metadataJson=base.metadata_json}
if('create_uid'in base){this.createUid=this.convertRecordField(base.create_uid)}
if('transcription'in base){this.transcription=base.transcription}}
exportToJson(){const out={}
out.text=this.text
out.from_me=this.fromMe
out.ttype=this.ttype
out.res_model=this.resModel
out.res_id=this.resId
if(this.id){out.id=this.id}
out.title_color=this.titleColor
if(this.dateMessage){out.date_message=serializeDateTime(this.dateMessage)}
if(this.metadataType){out.metadata_type=this.metadataType}
if(this.metadataJson){out.metadata_json=this.metadataJson}
if(this.buttons){out.button_ids=this.buttons}
if(this.createUid.id){out.create_uid=[this.createUid.id,this.createUid.name]}
if(this.chatList.id){out.chat_list_id=this.chatListRecord}
if(this.transcription){out.transcription=this.transcription}
return out}
exportToVals(){const out=this.exportToJson()
delete out.title_color
if(out.button_ids){out.button_ids=out.button_ids.map(btn=>[0,0,btn])}
if(out.create_uid){delete out.create_uid}
if(out.chat_list_id&&out.chat_list_id[0]){out.chat_list_id=out.chat_list_id[0]}
return out}
async buildExtraObj(){await super.buildExtraObj()
if(this.resModel&&!this.resModelObj){const result=await this.env.services.orm.call(this.resModel,'read_from_chatroom',[this.resId],{context:this.env.context})
this.resModelObj={}
if(result.length){result[0].displayName=result[0].display_name
this.buildResModelObj(result[0])}}}
buildResModelObj(attachRes){const attach={...attachRes}
if(this.isProductType){const{res_model,res_id,res_field}=attach
this.resModelObj=attach
this.resModelObj.src=`/web/image?model=${res_model}&id=${res_id}&field=${res_field}`}else{delete attach.display_name
delete attach.res_model
delete attach.res_id
delete attach.res_field
if(this.ttype==='audio'){this.resModelObj=attach
this.resModelObj.src=`/web/content/${this.resModelObj.id}`}else{this.resModelObj=this.createAttachObject(attach)}}}
getDate(){return formatDate(this.dateMessage)}
getHour(){return formatDateTime(this.dateMessage,{format:'HH:mm'})}
createLocationObj(){if(this.text){try{let text=this.text.split('\n');let locObj={};locObj.displayName=text[0].trim();locObj.address=text[1].trim();locObj.coordinate=text[2].trim();text=locObj.coordinate.replace('(','').replace(')','');text=text.split(',');locObj.coordinate={x:text[0].trim(),y:text[1].trim()}
locObj.mapUrl='https://maps.google.com/maps/search/';locObj.mapUrl+=`${locObj.displayName}/@${locObj.coordinate.x},${locObj.coordinate.y},17z?hl=es`;locObj.mapUrl=encodeURI(locObj.mapUrl);this.location=locObj;}catch(err){console.log('error location');console.log(err);}}}
convertDate(field){if(this[field]&&(this[field]instanceof String||typeof this[field]==='string')){this[field]=deserializeDateTime(this[field])}}
createAttachObject(attachmentData){let attachList=null
const{Attachment,AttachmentList}=this.env.services.messaging.modelManager.models
const vals={isAcrux:true,acruxMessageId:this.id,}
let attachment=Attachment.findFromIdentifyingData(attachmentData)
if(!attachment){attachment=Attachment.insert(attachmentData)}
if(!attachment.attachmentLists||attachment.attachmentLists.length===0){attachList=AttachmentList.insert(vals)}else{attachList=attachment.attachmentLists[0]
attachList.update(vals)}
const attachVals=this.getAttachVals()
attachVals.attachmentLists=link(attachList)
attachment.update(attachVals)
return attachList}
createNewAttachList(){if(this.resModelObj){const{AttachmentList}=this.env.services.messaging.modelManager.models
const attachList=AttachmentList.insert({isAcrux:true,acruxMessageId:this.id,})
const attachment=this.resModelObj
attachment.update({attachmentLists:unlink(this.resModelObj.attachmentLists)})
this.env.chatBus.trigger('updateAttachmentUI')
attachment.update({attachmentLists:link(attachList)})
this.resModelObj=attachList
if(this.ttype==='audio'){this.resModelObj={id:attachment.id,src:`/web/content/${attachment.id}`,}}}}
canBeAnswered(){return true}
canBeDeleted(){return true}
hasTitle(){return this.fromMe&&this.env.getShowUser()}
getAttachVals(){return{isAcrux:true}}
get htmlText(){return markup(this.text.replace(/~(~*[^~\n]+~*)~/g,'<del>$1</del>').replace(/_(_*[^_\n]+_*)_/g,'<em>$1</em>').replace(/\*(\**[^*\n]+\**)\*/g,'<b>$1</b>'))}
get isProductType(){return this.ttype==='image'&&this.isProduct}}
return __exports;});;
odoo.define('@9f550e3a7c92bb06c3fddba4f99a7b9e71b1ac051716574055e7bf82d8432aaf',async function(require){'use strict';let __exports={};const{ChatBaseModel}=require('@3c372604289611a498f68f71210a86a252c33aeb332b42905c018f29098599ca')
const MessageBaseModel=__exports.MessageBaseModel=class MessageBaseModel extends ChatBaseModel{constructor(comp,base){super(comp)
this.env
this.id=0
this.text=''
this.ttype=''
this.resModel=''
this.resId=0
this.isProduct=false
this.buttons=[]
this.chatList={id:0,name:'',buttonText:''}
if(base){this.updateFromJson(base)}}
updateFromJson(base){super.updateFromJson(base)
if('id'in base){this.id=base.id}
if('text'in base){this.text=base.text}
if('ttype'in base){this.ttype=base.ttype}
if('res_model'in base){this.resModel=base.res_model}
if('res_id'in base){this.resId=base.res_id}
if('is_product'in base){this.isProduct=base.is_product}
if('button_ids'in base){this.buttons=[...base.button_ids]}
if('chat_list_id'in base){this.chatList=this.convertRecordField(base.chat_list_id,['buttonText'])}}
get chatListRecord(){return this.convertFieldRecord(this.chatList,['buttonText'])}}
return __exports;});;
odoo.define('@a57f7a72eb29be2e68a9675edd680394d67e2ecd8df85dc2c38e83822c8551e8',async function(require){'use strict';let __exports={};const{parseDateTime,formatDateTime}=require('@web/core/l10n/dates')
const{ChatBaseModel}=require('@3c372604289611a498f68f71210a86a252c33aeb332b42905c018f29098599ca')
const ProductModel=__exports.ProductModel=class ProductModel extends ChatBaseModel{constructor(comp,base){super(comp)
this.env
this.id=0
this.displayName=''
this.lstPrice=0.0
this.uom={id:0,name:''}
this.writeDate=null
this.productTmpl={id:0,name:''}
this.name=''
this.type=''
this.defaultCode=''
this.qtyAvailable=0.0
this.showProductText=true
this.uniqueHashImage=''
this.showOptions=true
if(base){this.updateFromJson(base)}}
updateFromJson(base){super.updateFromJson(base)
if('id'in base){this.id=base.id}
if('display_name'in base){this.displayName=base.display_name}
if('lst_price'in base){this.lstPrice=base.lst_price}
if('uom_id'in base){this.uom=this.convertRecordField(base.uom_id)}
if('write_date'in base){this.writeDate=parseDateTime(base.write_date)
this.uniqueHashImage=formatDateTime(this.writeDate).replace(/[^0-9]/g,'')}
if('product_tmpl_id'in base){this.productTmpl=this.convertRecordField(base.product_tmpl_id)}
if('name'in base){this.name=base.name}
if('type'in base){this.type=base.type}
if('default_code'in base){this.defaultCode=base.default_code}
if('qty_available'in base){this.qtyAvailable=base.qty_available}
if('show_product_text'in base){this.showProductText=base.show_product_text}
if('show_options'in base){this.showOptions=base.show_options}}}
return __exports;});;
odoo.define('@6e344e9f6e92958c137d3f0fd12f4b185e994c729e92e763551752e4b953217a',async function(require){'use strict';let __exports={};const{ChatBaseModel}=require('@3c372604289611a498f68f71210a86a252c33aeb332b42905c018f29098599ca')
const UserModel=__exports.UserModel=class UserModel extends ChatBaseModel{constructor(comp,base){super(comp)
this.env
this.id=0
this.status=false
this.signingActive=false
if(base){this.updateFromJson(base)}}
updateFromJson(base){super.updateFromJson(base)
if('id'in base){this.id=base.id}
if('acrux_chat_active'in base){this.status=base.acrux_chat_active}
if('chatroom_signing_active'in base){this.signingActive=base.chatroom_signing_active}}}
return __exports;});;
