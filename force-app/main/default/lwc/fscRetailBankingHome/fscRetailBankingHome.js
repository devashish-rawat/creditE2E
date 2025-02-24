import { LightningElement , api } from 'lwc';
import getAccountList from '@salesforce/apex/GetRecordId.getAccount'
import getAnyAccountList from '@salesforce/apex/GetRecordId.getAnyAccount'
import getInteractionSummaryList from '@salesforce/apex/GetRecordId.getInteractionSummary'
import getActionPlanList from '@salesforce/apex/GetRecordId.getActionPlan'
import getHouseholdAccountList from '@salesforce/apex/GetRecordId.getHouseholdAccounts'
import getAnyHouseholdAccountList from '@salesforce/apex/GetRecordId.getAnyHouseholdAccount'
import getFinancialDealList from '@salesforce/apex/GetRecordId.getFinancialDeal'
import getLoanApplicationList from '@salesforce/apex/GetRecordId.getResidentialLoanApplication'
import getActionableList from '@salesforce/apex/GetRecordId.getActionableList'
import getServiceAppointment from '@salesforce/apex/GetRecordId.getServiceAppointment'

export default class FscRetailBankingHome extends LightningElement {
    @api app_welcome_text = "Welcome to the Retail Banking App";
    @api app_description = "What category of capabilities are you interested in?";
    @api no_record_account = false;
    @api no_record_household_account = false;
    @api no_record_financial_deal = false;
    @api no_record_action_plan = false;
    @api no_record_interaction_summary = false;
    @api no_record_loan_application = false;
    @api no_record_actionable_list = false;
    @api no_record_service_appointment = false;

    accountId;
    householdAccountId;
    financialDealId;
    actionPlanId;
    interactionSummaryId;
    loanApplicationId;
    actionableListId;
    serviceAppointmentId;
    omniscriptAcc;

    connectedCallback() {
        getAccountList()
        .then(result => {
            // console.debug("Account from getAccount", result);
            if (result.length) {
                this.accountId = result[0].Id;
            } else {
                // console.debug("Specified Account is not present, selecting random record");
                getAnyAccountList()
                .then(newResult => {
                    // console.debug("Account from getAnyAccount", newResult);
                    if (newResult.length) {
                        this.no_record_account = false;
                        this.accountId = newResult[0].Id;
                    } else {
                        this.no_record_account = true;
                        this.accountId = ""
                    }
                })
            }
            this.omniscriptAcc = "/lightning/page/omniscript?omniscript__type=FSC_Sample&omniscript__subType=Account_Opening_Sample&omniscript__language=English&omniscript__theme=lightning&omniscript__tabIcon=custom%3Acustom18&omniscript__tabLabel=Open%20Account&omniscript__recordId=" + this.accountId + "&uid=FSC_Sample%2FAccount_Opening_Sample%2FEnglish%2FFileBased";
        })

        getHouseholdAccountList()
        .then(result => {
            // console.debug("Household Account from getHouseholdAccount", result);
            if (result.length) {
                this.householdAccountId = result[0].Id;
            } else {
                // console.debug("Specified Household Account is not present, selecting random record");
                getAnyHouseholdAccountList()
                .then(newResult => {
                    // console.debug("Household Account from getAnyHouseholdAccount", newResult);
                    if (newResult.length) {
                        this.no_record_household_account = false;
                        this.householdAccountId = newResult[0].Id;
                    } else {
                        this.no_record_household_account = true;
                        this.householdAccountId = ""
                    }
                })
            }
        })

        getInteractionSummaryList()
        .then(result => {
            // console.debug("InteractionSummary from getInteractionSummary", result);
            if (result.length) {
                this.no_record_interaction_summary = false;
                this.interactionSummaryId = result[0].Id;
            } else {
                this.no_record_interaction_summary = true;
                this.interactionSummaryId = ""
            }
        })

        getActionPlanList()
        .then(result => {
            // console.debug("ActionPlan from getActionPlan", result);
            if (result.length) {
                this.no_record_action_plan = false;
                this.actionPlanId = result[0].Id;
            } else {
                this.no_record_action_plan = true;
                this.actionPlanId = ""
            }
        })

        getFinancialDealList()
        .then(result => {
            // console.debug("FinancialDeal from getFinancialDeal", result);
            if (result.length) {
                this.no_record_financial_deal = false;
                this.financialDealId = result[0].Id;
            } else {
                this.no_record_financial_deal = true;
                this.financialDealId = ""
            }
        })

        getLoanApplicationList()
        .then(result => {
            // console.debug("ResidentialLoanApplication from getLoanApplicationList", result);
            if (result.length) {
                this.no_record_loan_application = false;
                this.loanApplicationId = result[0].Id;
            } else {
                this.no_record_loan_application = true;
                this.loanApplicationId = ""
            }
        })

        getActionableList()
        .then(result => {
            // console.debug("Actionable List from getActionableList", result);
            if (result.length) {
                this.no_record_actionable_list = false;
                this.actionableListId = result[0].Id;
            } else {
                this.no_record_actionable_list = true;
                this.actionableListId = "";
            }
        })

        getServiceAppointment()
        .then(result => {
            // console.debug("Service Appointment from getServiceAppointment", result);
            if (result.length) {
                this.no_record_service_appointment = false;
                this.serviceAppointmentId = result[0].Id;
            } else {
                this.no_record_service_appointment = true;
                this.serviceAppointmentId = ""
            }
        })
    }

    get pass_false() {
        return false;
    }

    get pass_true() {
        return true;
    }
}