global class HTT_ListOfTEFSOverview_Controller {
    
    List<HTT_OEM_TEFS__c> TEFSList{get; set;}
    List<HTT_OEM_TEFS__c> ListOfTEFS;
    public String PNId {get; set;}
    
    public String PNFieldStr = '00N18000000TP4B'; // TSDev Object:TEFS Field: Part Number
//public String PNFieldStr = '00N23000000KdaH'; // TSFull Object:TEFS Field: Part Number
//public String PNFieldStr = '00N1400000AskX0'; // Prod Object:TEFS Field: Part Numbe
    
    public HTT_ListOfTEFSOverview_Controller(ApexPages.StandardController controller) {
    
    }
    public String getURL(){
        String  Urlstr;
        List <HTT_OEM_Opp_Product__c> listPN = [Select id from HTT_OEM_Opp_Product__c where Opportunity__c =: ApexPages.CurrentPage().getParameters().get('id') and Active__c = true];
        
        system.debug('listPN ' + listPN);
        
        if(listPN.size()==1){
            PNId=listPN[0].Id;
            Urlstr = 'apex/HTT_OverrideTEFS?CF'+ PNFieldStr +'_lkid='+PNId+'&mode=edit';
        }
        else{
            if(listPN.size()>1){
                PNId='AAAAAAAAAAA';
                Urlstr = 'apex/HTT_TEFSSelPN_Popup?id='+ApexPages.CurrentPage().getParameters().get('id');
            }
        
        }
        
        system.debug('PNId ' + PNId);
        system.debug('Urlstr ' + Urlstr);
        
        return Urlstr;
    }
    
    public list<HTT_OEM_TEFS__c> getLOTEFS(){
        
        ListOfTEFS =[select id, name,CurrencyISOCode,Version__c,Cust_Change_No__c,NPO__c,Customer_Name__c,Project_Name__c,
            Customer_PN__c,  HTT_PN__c,Phase__c,CreatedDate, Implementation_dt__c,Status__c,Components__c,
            Old_PN__c,New_PN__c,PO__c,Category_of_Change__c,Change_Type__c,Source_Change__c,Description_Change__c,
            Initial_Cost__c,New_Cost__c,Initatial_Price__c,New_Price__c,MM__c,New_MM__c,MM_per__c,New_MM_perc__c,
            MM_Improvement__c,Tooling_Cost__c,Testing__c,Tooling__c,Prototype__c,Eng_Cost__c,PQF_Id__c
        from HTT_OEM_TEFS__c where Part_Number__c
            in (Select id from HTT_OEM_Opp_Product__c where Opportunity__c =: ApexPages.CurrentPage().getParameters().get('id')) order by Version__c DESC]; //Status__C,
        //Description_Change__c,
        TEFSList = new List<HTT_OEM_TEFS__c>();
        for(HTT_OEM_TEFS__c tefs : ListOfTEFS)
        {
            //system.debug('tefs.MM_Improvement__c ' + tefs.MM_Improvement__c);
            
            TEFSList.add(tefs);
        }
        
        return TEFSList;
    }
    
    @RemoteAction
    global static List<HTT_OEM_TEFS__c> getRemoteTefs(String oppId){
        
        List<HTT_OEM_TEFS__c> result =[select id, name,CurrencyISOCode,Version__c,Cust_Change_No__c,NPO__c,Customer_Name__c,Project_Name__c,
            Customer_PN__c,  HTT_PN__c,Phase__c,CreatedDate, Implementation_dt__c,Status__c,Components__c,
            Old_PN__c,New_PN__c,PO__c,Category_of_Change__c,Change_Type__c,Source_Change__c,Description_Change__c,
            Initial_Cost__c,New_Cost__c,Initatial_Price__c,New_Price__c,MM__c,New_MM__c,MM_per__c,New_MM_perc__c,
            MM_Improvement__c,Tooling_Cost__c,Testing__c,Tooling__c,Prototype__c,Eng_Cost__c,PQF_Id__c
        from HTT_OEM_TEFS__c where Part_Number__c
            in (Select id from HTT_OEM_Opp_Product__c where Opportunity__c =:oppId) order by Version__c ASC]; //Status__C,
        //Description_Change__c,
        return result;
    }
    
    @RemoteAction
    global static HTT_OEM_Opp_Product__c getBaselineValues(String oppId){
        HTT_OEM_Opp_Product__c result = [SELECT Id, Total_Material_Cost__c, Total_Price__c, MM__c, MM_perc__c, Tooling__c,
            Testing__c, Prototype__c, Eng_Cost__c
        FROM HTT_OEM_Opp_Product__c
        WHERE Opportunity__c=:oppId and Previous_version__c=NULL AND Pqf_Number__c!=null].get(0);
        return result;
    }

}