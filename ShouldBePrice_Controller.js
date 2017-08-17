public with sharing class HTT_ShouldBePrice_editpage_Controller{

    public String salesPlanIdsToExport {get;set;}
    public String salesPlanIds {get; set;}
    //month/year variables
    public Integer current_month = 0;
    public String current_year = '';
    public Integer past_month = 0;
    public String past_year = '';   // = current year - 1 if current monty = january; = current year if current monty != january
    public Integer sp_month {get; set;} 
    public String sp_year {get; set;} 
    public String currency_value {get; set;} 
    
    public string selectedChannel {get; set;}  
    public string selectedMonth {get; set;}     
    public string message {get; set;}
    public string message2 {get; set;}
    public string clos_message {get; set;}

    //Counters
    public Integer iteration_current {get; set;}
    public Integer iteration_total {get; set;}
    
    //string for Mult Search
    public String mult_pn {get; set;}
    public String mult_cpn {get; set;}
    public String mult_npo {get; set;}
    public String mult_brand {get; set;}
    public String mult_engdesc {get; set;}
    public String mult_chn {get; set;}
    public Boolean mult_ls {get; set;}
    
    //Lists for Mult Search
    public List<String> list_mult_pn {get; set;}
    public List<String> list_mult_cpn {get; set;}
    public List<String> list_mult_npo {get; set;}
    public List<String> list_mult_brand {get; set;}
    public List<String> list_mult_engdesc {get; set;}
    
    //show_section_variables
    public Boolean show_simple {get; set;}
    public Boolean show_adv {get; set;}

    public Boolean show_prev {get; set;}
    public Boolean show_next {get; set;}
    
    public Boolean show_edit_all {get; set;}
    public Boolean show_edit_single {get; set;}
    public Boolean show_update_all {get; set;}
    
    public Id sp_id {get; set;}
    public Id sbp_id {get; set;}
    public Boolean selected_bool {get; set;}
    public String curr_selected {get; set;}
    public Decimal conversion_rate {get; set;}
    public Boolean ischangedSAPvSBP {get; set;}
    public Boolean isLumpSum {get; set;}
    
    //Simple filter variables
    /*public string simp_NPO {get; set;}
    public string simp_Brand {get; set;}
    public string simp_PN {get; set;}
    public string simp_PN2 {get; set;}  
    public string simp_CPN {get; set;}
    public string simp_endgesc {get; set;}*/
    
    //dashboard vars
    public string dash_npo {get; set;}
    public string dash_pn {get; set;}
    public string dash_brand {get; set;}
    public string dash_ed {get; set;}
    public string dash_channel {get; set;}
    
    //List Vars
    public String list_value{get; set;}
    public String searchValue {get; set;}
    public Integer maxHeight {get; set;}
    public Integer height {get; set;}
    public List<SelectOption> results {get; set;}
    public Boolean showList {get; set;}
    public String selectFilter {get; set;}
    public Id LumpSumSPRTId {get;set;}
    public string account_name {get; set;}
    public Id BrandId {get; set;}
    
    //Search Lists
    public List<OEM_Sales_Plan_Ext_Data__c> sp_list {get;set;}
    public list<OEM_SBPP_Ext_Data__c> sbp {get;set;}
    public List<sales_plan_list> sp_list_table {get;set;}
    
    public List<OEM_SBPP_Ext_Data__c> sbp_all {get;set;}
    public List<OEM_SBPP_Ext_Data__c> sbp_all_past {get;set;}
    public List<OEM_SBPP_Ext_Data__c> sbp_all_forecast {get;set;}
    
    public List<OEM_SBPP_Ext_Data__c> sbp_single {get;set;}
    public List<OEM_SBPP_Ext_Data__c> sbp_single_past {get;set;}
    public List<OEM_SBPP_Ext_Data__c> sbp_single_forecast {get;set;}
    public List<Id> sp_id_list {get;set;}
    
    public List<SBPPSWrapper> pricesplit {get;set;}
    public List<SBPSimWrapper> pricesimul {get;set;}
    public List<SBPSimDetWrapper> pricesimuldet {get;set;}
    
    //Transpose the SBP layout
    public List<SBPListWrapper> sbp_tran_single {get;set;}
    public List<SBPListWrapper> sbp_tran_all{get;set;}
    
    //Prev-Current-Next Years
    public String prev_year {get;set;}
    public String curr_year {get;set;}
    public String next_year {get;set;}
    
    public Boolean show_prevy {get; set;} // to comment
        
    public Boolean show_pasty {get; set;}
    public Boolean show_curry {get; set;}
    public Boolean show_nexty {get; set;}
    
    //Show-Hide Sections
    public Boolean show_pricesplit {get; set;}
    public Boolean show_simulation {get; set;}
    public Boolean show_ps {get; set;}
    public Boolean hide_ps {get; set;}
    public Boolean show_sim {get; set;}
    public Boolean hide_sim {get; set;}
        
    public Transient List<SBPPSWrapper> sbp_price_split;
    
    public Transient List<SBPSimWrapper> sbp_simulation;
    public Transient List<SBPSimWrapper> sbp_simulation_py;
    public Transient List<SBPSimWrapper> sbp_simulation_ny;
    public Transient List<SBPSimDetWrapper> sbp_simulation_details_py;
    public Transient List<SBPSimDetWrapper> sbp_simulation_details;
    public Transient List<SBPSimDetWrapper> sbp_simulation_details_ny;
    public List<OEM_Sales_Plan_Ext_Data__c> sp_list_brand;
    
    //Wrapper Classes
    public class sales_plan_list{
        public boolean select_bool {get; set;}
        public OEM_Sales_Plan_Ext_Data__c sp {get; set;}
    }   
    
    //Controller
    public HTT_ShouldBePrice_editpage_Controller(){
        
        sp_id= ApexPages.currentPage().getParameters().get('sp_id');
        
        sp_month = 0;
        sp_year = '';
        Date today_date = Date.today();
        
        current_month = today_date.month();
        current_year = string.valueOf(today_date.year());
        
        prev_year=string.valueOf(today_date.year()-1);
        curr_year=current_year;
        next_year =string.valueOf(today_date.year()+1);
        
        if(current_month == 1) past_month = 12;
        else past_month = current_month - 1;
        
        if(current_month == 1) past_year = string.valueOf(today_date.year() - 1);
        else past_year = string.valueOf(today_date.year());
        
        //system.debug('%%%%%%%%%%%% DEBUG month/year: ' + past_month + ' ' + past_year);
        
        message = '';
        message2 = '';
        clos_message = '';
        
        //init show vars
        show_adv = false;
        show_simple = true;
        show_next = false;
        show_prev = false;
        show_edit_all = false;
        show_edit_single = false;
        show_update_all = false;

        showList = false;
        
        /*show_nexty = true;
        show_prevy = false;*/
        
        show_pasty = false;
        show_curry = true;
        show_nexty = false;
        
        show_ps=false;
        hide_ps=true;
        
        show_pricesplit=false;
        show_simulation=true;
        
        show_sim=false;
        hide_sim=true;
        
        //system.debug('%%%%%%%%%%%% DEBUG BOOL1: ' + show_adv + ' ' + show_simple);
        
        //var init
        maxHeight = 20;
        
        //conversion rate default value
        conversion_rate=1;
        
        ischangedSAPvSBP =false;
        
        isLumpSum=false;
        
        LumpSumSPRTId = Schema.SObjectType.OEM_Sales_Plan_Ext_Data__c.getRecordTypeInfosByName().get('Lump Sum Sales Plan').getRecordTypeId();

    }

    //--------------------- SEARCH SECTION ----------------------//

    public PageReference switch_to_simple(){
        
        show_adv = false;
        show_simple = true;
        //system.debug('%%%%%%%%%%%% DEBUG BOOL2: ' + show_adv + ' ' + show_simple);
        
        curr_selected=null;
        
        return null;
    }
    
    public PageReference switch_to_adv(){
    
        show_adv = true;
        show_simple = false;    
        //system.debug('%%%%%%%%%%%% DEBUG BOOL3: ' + show_adv + ' ' + show_simple);

        return null;        
    }
    
    public PageReference search_sp_mult(){
    
        try {
            System.debug('HTT_ShouldBePrice_editpage_Controller::search_sp_mult::Enter method!');
            show_edit_all = false;
            show_edit_single = false;
            show_update_all = false;
            
            sp_id = null;
            
            islumpsum=false;
            
            message = '';
            message2 = '';
            clos_message ='';
            {ApexPages.getMessages().clear();}
            
            list_mult_pn = unpackString(mult_pn);
            list_mult_cpn = unpackString(mult_cpn);
            list_mult_npo = unpackString(mult_npo);
            list_mult_brand = unpackString(mult_brand);
            list_mult_engdesc = unpackString(mult_engdesc);
                    
            //system.debug('%%%%%%%%% DEBUG list_mult: ' + list_mult_pn + ' ' + list_mult_cpn + ' ' + list_mult_npo + ' ' + list_mult_brand + ' ' + list_mult_engdesc);
            
            sp_list = new List<OEM_Sales_Plan_Ext_Data__c>();
            sp_list_table = new List<sales_plan_list>();
            
            Id SalesPlanRecTypeid;
            
            if(mult_ls==true){
                SalesPlanRecTypeid = Schema.SObjectType.OEM_Sales_Plan_Ext_Data__c.getRecordTypeInfosByName().get('Lump Sum Sales Plan').getRecordTypeId();}
            else {
                SalesPlanRecTypeid = Schema.SObjectType.OEM_Sales_Plan_Ext_Data__c.getRecordTypeInfosByName().get('OEM Sales Plan').getRecordTypeId();} 
                
            String soql = 'Select Id, Name, Roll_Month__c, Roll_Year__c, Brand__c, Brand__r.Name, Brand_Name2__c, Assembly_Plant__c, Region__c, Shipping_Plant__c, Version__c, Material_prd__c, Material_prd__r.Id, Material_prd__r.External_ID__c, Material_prd__r.Vertical__c, Material_prd__r.Material_Engine_Description__c, Material_Engine_Description__c,Volume__c, SAP_Price__c, Channel__c, Select__c, NPO__c, App_Id__c,P_N_Customer__c, Roll_Month_Numeric__c, SAP_Price_text__c, CurrencyIsoCode, M01__c, M02__c, M03__c, M04__c, M05__c, M06__c, M07__c, M08__c, M09__c, M10__c, M11__c, M12__c, M13__c, M14__c, M15__c, M16__c, M17__c, M18__c, M19__c, M20__c, M21__c, M22__c, M23__c, M24__c, Brand_Ship_To__c, View__c, Price_Variant__c FROM OEM_Sales_Plan_Ext_Data__c WHERE isClose__c = false AND RecordTypeId=:SalesPlanRecTypeid'; //Roll_Month_Numeric__c =:current_month and Roll_Year__c =:current_year';
            
            // MSavioli: remove the version filter, now are filtered on Is Closed = false
            /*if(selectedMonth != null && selectedMonth != '' && selectedMonth == 'Current Sales Plan'){
                soql = soql +  ' and Roll_Month_Numeric__c =:current_month and Roll_Year__c =:current_year';
            } else { if (selectedMonth != null && selectedMonth != '' && selectedMonth == 'Past Sales Plan') {
                soql = soql +  ' and Roll_Month_Numeric__c =:past_month and Roll_Year__c =:past_year';
            }}*/
            
            //system.debug('%%%%%%%%%%%%%% DEBUG soql1: ' + soql);  
            if(!list_mult_brand.isEmpty()) {
                soql = soql +  ' and Brand_Name2__c in ' + list_mult_brand;
            }
            //system.debug('%%%%%%%%%%%%%% DEBUG soql2: ' + soql);  
            
            if(!list_mult_pn.isEmpty()) {
                soql = soql +  ' and Material_prd__r.External_ID__c in ' + list_mult_pn;
            }
            //system.debug('%%%%%%%%%%%%%% DEBUG soql3: ' + soql);  

            if(!list_mult_cpn.isEmpty()) {
                soql = soql +  ' and P_N_Customer__c in ' + list_mult_cpn;
            }      
            //system.debug('%%%%%%%%%%%%%% DEBUG soql4: ' + soql);    

            if(!list_mult_npo.isEmpty()) {
                soql = soql +  ' and NPO__c in ' + list_mult_npo;
            }
            //system.debug('%%%%%%%%%%%%%% DEBUG soql5: ' + soql);  
            
            if(!list_mult_engdesc.isEmpty()) {
                soql = soql +  ' and Material_prd__r.Material_Engine_Description__c in ' + list_mult_engdesc;
            }
            //system.debug('%%%%%%%%%%%%%% DEBUG soql6: ' + soql);  
           
            if(mult_chn != null && mult_chn != '' && mult_chn != 'OEM+OES'){
                soql = soql +  ' and Channel__c =:mult_chn';
            }            
            //system.debug('%%%%%%%%%%%%%% DEBUG soql7: ' + soql);  
            
            soql = soql + ' ORDER BY Material_prd__c,Brand_Name2__c ASC LIMIT 500';
            
            //system.debug('%%%%%%%%%%%%%% DEBUG soql: ' + soql);     
            
            sp_list = database.query(soql);

            if(!sp_list.isEmpty()){
            
                
                //Get The Closing Date for current version of Sales plan
                
                
                Date today_date = Date.today();
                
               // List<HTT_OE_Event_Manager__c> current_cdate = database.query('Select Date__c from HTT_OE_Event_Manager__c where Date__c>=: today_date order by Date__c limit 1');                
               
               List<Event> current_cdate =  database.query('Select  StartDateTime,ActivityDate from Event where Owner.Name=\'HTT OEM Sales Team\' and StartDateTime>=: today_date order by StartDateTime limit 1');  
                
                if(!current_cdate.isEmpty()){
                
                //clos_message = ' - The Closing Date is: ' + current_cdate[0].Date__c;
                
                clos_message = ' - The Closing Date is: ' + current_cdate[0].ActivityDate.format();  
                
                }
                
                //calc iteration_total
                if(math.mod(sp_list.size(), 25) == 0){  //# of chunks
                    iteration_total = Integer.ValueOf(math.floor(sp_list.size()/25));
                } else iteration_total = Integer.ValueOf(math.floor(sp_list.size()/25) + 1);
                
                iteration_current = 0;
                
                
                if(iteration_total == 1) {
                    for(Integer i = 0; i < sp_list.size(); i++){ //this is always the firsts iteration
                    
                        sales_plan_list sp_list_table_tmp = new sales_plan_list();
                        sp_list_table_tmp.select_bool = false;
                        sp_list_table_tmp.sp = sp_list[i];
                        
                        sp_list_table.add(sp_list_table_tmp);
                        sp_month = Integer.valueOf(sp_list[i].Roll_Month_Numeric__c); 
                        sp_year = String.valueOf(sp_list[i].Roll_Year__c);
                         message =  'The current version is: ' + sp_list[i].Version__c + clos_message;
                        {ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.INFO,message);
                            ApexPages.addMessage(myMsg);
                        }
                        
                    }
                } else {
                    for(Integer i = 0; i < 25; i++){ //this is always the firsts iteration
                    
                        sales_plan_list sp_list_table_tmp = new sales_plan_list();
                        sp_list_table_tmp.select_bool = false;
                        sp_list_table_tmp.sp = sp_list[i];
                        
                        sp_list_table.add(sp_list_table_tmp);
                        sp_month = Integer.valueOf(sp_list[i].Roll_Month_Numeric__c); 
                        sp_year = String.valueOf(sp_list[i].Roll_Year__c);
                         message =  'The current version is: ' + sp_list[i].Version__c + clos_message;
                        {ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.INFO,message);
                            ApexPages.addMessage(myMsg);
                        }
                        //system.debug('%%%%%%%%%%%%%% DEBUG sp_list: ' + sp_list[i]);
                    }
                }
                
                //system.debug('%%%%%%%%%%%%%% DEBUG sp_list: ' + sp_list);
                //system.debug('%%%%%%%%%%%%%% DEBUG sp_list_table: ' + sp_list_table);
                    
                //Setting next-prev vars
                show_prev = false; //first iteration there is no need for prev
                
                if(iteration_total > 1){
                    show_next = true;
                } else show_next = false;

                //system.debug('$$$$$$$$$$$$$$$$ DEBUG Iteration sp_list: ' + sp_list.size());
                //system.debug('$$$$$$$$$$$$$$$$ DEBUG Iteration: ' + show_prev + ' ' + show_next + ' ' + iteration_total + ' ' + iteration_current);

            }
            else
            {
            message =  'No Results Found';
            {ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.WARNING,message);
                            ApexPages.addMessage(myMsg);
            }
            }
         
            
            return null;
        
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
            return null;
        }   
    }
    
    public PageReference search_sp_simple(){
        try {
            
            show_edit_all = false;
            show_edit_single = false;
            show_update_all = false;
            showList = false;        
            
            sp_id = null;
            
            islumpsum=false;
            
            message = '';
            message2 = '';
            clos_message='';
            {ApexPages.getMessages().clear();}
            
            //system.debug('%%%%%%%%% DEBUG single values: ' + searchValue + ' ' + message);
            
            sp_list = new List<OEM_Sales_Plan_Ext_Data__c>();
            sp_list_table = new List<sales_plan_list>();
            
            Id SalesPlanRecTypeid;
            
            if(selectFilter == 'lsum'){
                SalesPlanRecTypeid = Schema.SObjectType.OEM_Sales_Plan_Ext_Data__c.getRecordTypeInfosByName().get('Lump Sum Sales Plan').getRecordTypeId();}
            else {
                SalesPlanRecTypeid = Schema.SObjectType.OEM_Sales_Plan_Ext_Data__c.getRecordTypeInfosByName().get('OEM Sales Plan').getRecordTypeId();
            
            }
                
            String soql = 'Select Id, Name, Roll_Month__c, Roll_Year__c, Brand__c, Brand__r.Name, Brand_Name2__c, Assembly_Plant__c, Region__c, Shipping_Plant__c, Version__c, Material_prd__c, Material_prd__r.Id, Material_prd__r.External_ID__c, Material_prd__r.Vertical__c, Material_prd__r.Material_Engine_Description__c, Material_Engine_Description__c,Volume__c, SAP_Price__c, Channel__c, Select__c, NPO__c, App_Id__c, P_N_Customer__c, Roll_Month_Numeric__c, SAP_Price_text__c, CurrencyIsoCode, M01__c, M02__c, M03__c, M04__c, M05__c, M06__c, M07__c, M08__c, M09__c, M10__c, M11__c, M12__c, M13__c, M14__c, M15__c, M16__c, M17__c, M18__c, M19__c, M20__c, M21__c, M22__c, M23__c, M24__c, Brand_Ship_To__c,Price_Variant__c FROM OEM_Sales_Plan_Ext_Data__c WHERE isClose__c= false AND RecordTypeId=:SalesPlanRecTypeid'; //Roll_Month_Numeric__c =:current_month and Roll_Year__c =:current_year';
            // MSavioli: remove the version filter, now are filtered on Is Closed = false
            /*if(selectedMonth != null && selectedMonth != '' && selectedMonth == 'Current Sales Plan'){
                soql = soql +  ' and Roll_Month_Numeric__c =:current_month and Roll_Year__c =:current_year';
            } else { if (selectedMonth != null && selectedMonth != '' && selectedMonth == 'Past Sales Plan') {
                soql = soql +  ' and Roll_Month_Numeric__c =:past_month and Roll_Year__c =:past_year';
            }}*/
            
            //system.debug('%%%%%%%%%%%%%% DEBUG soql1: ' + soql);  
            
            if(selectFilter == 'brand' && searchValue != null && searchValue != '') {           
                soql = soql +  ' and Brand_Name2__c LIKE \'%' + searchValue +'%\'';
            }
            //system.debug('%%%%%%%%%%%%%% DEBUG soql2: ' + soql);  
            if(selectFilter == 'pn' && searchValue != null && searchValue != '') {
                soql =  soql +  ' and Material_prd__r.External_ID__c LIKE \'%' + searchValue +'%\'';
            }
            //system.debug('%%%%%%%%%%%%%% DEBUG soql3: ' + soql);  
            
            if(selectFilter == 'npo' && searchValue != null && searchValue != '') {
                soql = soql +  ' and NPO__c LIKE \'%' + searchValue + '%\'';
            }
                //system.debug('%%%%%%%%%%%%%% DEBUG soql4: ' + soql);  
            if(selectFilter == 'cpn' && searchValue != null && searchValue != '') {
                soql = soql +  ' and P_N_Customer__c LIKE \'%' + searchValue + '%\'';
            }
            //system.debug('%%%%%%%%%%%%%% DEBUG soql5: ' + soql);  

            if(selectFilter == 'eng desc' && searchValue != null && searchValue != '') {
                soql = soql +  ' and Material_prd__r.Material_Engine_Description__c LIKE \'%' + searchValue + '%\'';
            }
            //system.debug('%%%%%%%%%%%%%% DEBUG soql6: ' + soql);  
            
            if(selectedChannel != null && selectedChannel != '' && selectedChannel != 'OEM+OES'){
                soql = soql +  ' and Channel__c =:selectedChannel';
            }
            
            //system.debug('%%%%%%%%%%%%%% DEBUG soql7: ' + soql);  
            
            /*if(volume_filter != null && volume_filter) {
                soql = soql + ' ORDER BY Volume__c DESC';
            }*/
            
            soql = soql + ' ORDER BY Material_prd__c,Brand_Name2__c ASC LIMIT 500';
            
            system.debug('%%%%%%%%%%%%%% DEBUG soql: ' + soql);     
            
            sp_list = database.query(soql);

            if(!sp_list.isEmpty()){
            
                //Get The Closing Date for current version of Sales plan
                
                Date today_date = Date.today();
                
               // List<HTT_OE_Event_Manager__c> current_cdate = database.query('Select Date__c from HTT_OE_Event_Manager__c where Date__c>=: today_date order by Date__c limit 1');                
               
               List<Event> current_cdate =  database.query('Select  StartDateTime,ActivityDate from Event where Owner.Name=\'HTT OEM Sales Team\' and StartDateTime>=: today_date order by StartDateTime limit 1');  
                
                if(!current_cdate.isEmpty()){
                
                //clos_message = ' - The Closing Date is: ' + current_cdate[0].Date__c;
                
                clos_message = ' - The Closing Date is: ' + current_cdate[0].ActivityDate.format();  
                
                }
            
                //calc iteration_total
                if(math.mod(sp_list.size(), 25) == 0){  //# of chunks
                    iteration_total = Integer.ValueOf(math.floor(sp_list.size()/25));
                } else iteration_total = Integer.ValueOf(math.floor(sp_list.size()/25) + 1);
                
                iteration_current = 0;
                
                
                if(iteration_total == 1) {
                    for(Integer i = 0; i < sp_list.size(); i++){ //this is always the firsts iteration
                    
                        sales_plan_list sp_list_table_tmp = new sales_plan_list();
                        sp_list_table_tmp.select_bool = false;
                        sp_list_table_tmp.sp = sp_list[i];
                        
                        sp_list_table.add(sp_list_table_tmp);
                        sp_month = Integer.valueOf(sp_list[i].Roll_Month_Numeric__c); 
                        sp_year = String.valueOf(sp_list[i].Roll_Year__c);
                        message =  'The current version is: ' + sp_list[i].Version__c + clos_message;
                        {ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.INFO,message);
                            ApexPages.addMessage(myMsg);
                        }
                        
                    }
                } else {
                    for(Integer i = 0; i < 25; i++){ //this is always the firsts iteration
                    
                        sales_plan_list sp_list_table_tmp = new sales_plan_list();
                        sp_list_table_tmp.select_bool = false;
                        sp_list_table_tmp.sp = sp_list[i];
                        
                        sp_list_table.add(sp_list_table_tmp);
                        sp_month = Integer.valueOf(sp_list[i].Roll_Month_Numeric__c); 
                        sp_year = String.valueOf(sp_list[i].Roll_Year__c);
                        message =  'The current version is: ' + sp_list[i].Version__c + clos_message;
                        {ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.INFO,message);
                            ApexPages.addMessage(myMsg);
                        }
                        //system.debug('%%%%%%%%%%%%%% DEBUG sp_list: ' + sp_list[i]);
                    }
                }
                
                //system.debug('%%%%%%%%%%%%%% DEBUG sp_list: ' + sp_list);
                //system.debug('%%%%%%%%%%%%%% DEBUG sp_list_table: ' + sp_list_table);
                    
                //Setting next-prev vars
                show_prev = false; //first iteration there is no need for prev
                
                if(iteration_total > 1){
                    show_next = true;
                } else show_next = false;

                //system.debug('$$$$$$$$$$$$$$$$ DEBUG Iteration sp_list: ' + sp_list.size());
                //system.debug('$$$$$$$$$$$$$$$$ DEBUG Iteration: ' + show_prev + ' ' + show_next + ' ' + iteration_total + ' ' + iteration_current);

            }
            else
            {
            message =  'No Results Found';
            {ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.WARNING,message);
                            ApexPages.addMessage(myMsg);
            }
            }
         
            
            return null;
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
            return null;
        }   
    }
    
    //string unpack comma separated
    public List<String> unpackString(String s){

        List<String> temp_list = new List<String>();
            
        try {
                
            if(s != null && s != ''){
            
                if(s.indexOf(',') < 0){
                    
                    temp_list.add('\'' + s + '\'');
                    
                } else {
                    
                    while(s.indexOf(',') > 0){
                        //system.debug('%%%%%%%%%%%% DEBUG1 While: ' + s + ' ' + s.indexOf(',') + ' ' + temp_list);
                        temp_list.add('\'' + s.left(s.indexOf(',')) + '\'');
                        s = s.substring(s.indexOf(',')+1 , s.length());
                    }
                    
                    //system.debug('%%%%%%%%%%%% DEBUG2 While: ' + s + ' ' + s.indexOf(',') + ' ' + temp_list);    
                    if(s.length()>0) temp_list.add('\'' + s + '\'');
                    //system.debug('%%%%%%%%%%%% DEBUG3 While: ' + s + ' ' + s.indexOf(',') + ' ' + temp_list);
                }
            }
                
            return temp_list;
        
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
            return temp_list;
        }           
    }

    public void next_sp(){

        try {
            
            //reset section
            sbp = new List<OEM_SBPP_Ext_Data__c>();
            
            //
            sp_list_table = new List<sales_plan_list>();
            iteration_current++;

            if(iteration_current == (iteration_total-1)){
                for(Integer i = (iteration_current*25); i < sp_list.size(); i++){ //this is always the firsts iteration
                
                    sales_plan_list sp_list_table_tmp = new sales_plan_list();
                    sp_list_table_tmp.select_bool = false;
                    sp_list_table_tmp.sp = sp_list[i];
                    
                    sp_list_table.add(sp_list_table_tmp);
                    //system.debug('%%%%%%%%%%%%%% DEBUG sp_list: ' + iteration_current + (i+(iteration_current*25)) + sp_list[i]);
                }
                
                show_next = false;
            } else {
                for(Integer i = 0; i < 25; i++){ //this is always the firsts iteration
            
                    sales_plan_list sp_list_table_tmp = new sales_plan_list();
                    sp_list_table_tmp.select_bool = false;
                    sp_list_table_tmp.sp = sp_list[i+(iteration_current*25)];
                    
                    sp_list_table.add(sp_list_table_tmp);
                    //system.debug('%%%%%%%%%%%%%% DEBUG sp_list2: ' + iteration_current + (i+(iteration_current*25)) + sp_list[i]);
                    
                }
            }
            
            show_prev = true;
            
        } catch (Exception e){
        
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }       
    }   
    
    public void noaction(){}
    
    public void showps(){

      show_ps=true;
      hide_ps=false;

    }   
    
    public void hideps(){
      
      show_ps=false;
      hide_ps=true;
    }
    
    public void showsim(){
    
      // Call function to re-calculate the impact simulation
      CalcImpactSimulation(sp_id, current_year);

      show_sim=true;
      hide_sim=false;
      

    }
    
    public void hidesim(){
      
      show_sim=false;
      hide_sim=true;
    }
    
    public void previous_year(){
        
        /*show_nexty = true;
        show_prevy = false; */
        
        if(show_pasty==true){
            show_pasty=true;
            show_curry= false;
            show_nexty=false;
        }
        else {
            if(show_curry==true){
                show_pasty=true;
                show_curry= false;
                show_nexty=false;
            }
            else {
                if(show_nexty==true){
                    show_pasty=false;
                    show_curry= true;
                    show_nexty=false;
                }
            
            }
        }       

    }    
   
    
    public void next_year(){

        if(show_pasty==true){
            show_pasty=false;
            show_curry= true;
            show_nexty=false;
        }
        else {
            if(show_curry==true){
                show_pasty=false;
                show_curry= false;
                show_nexty=true;
            }
            else {
                if(show_nexty==true){
                    show_pasty=false;
                    show_curry= false;
                    show_nexty=true;
                }
            
            }
        }
    }

    public void previous_sp(){

        try {
        
            //reset section
            sbp = new List<OEM_SBPP_Ext_Data__c>();
            
            //
            sp_list_table = new List<sales_plan_list>();
            iteration_current--;
            
            for(Integer i = 0; i < 25; i++){ //this is always the firsts iteration
            
                sales_plan_list sp_list_table_tmp = new sales_plan_list();
                sp_list_table_tmp.select_bool = false;
                sp_list_table_tmp.sp = sp_list[i+(iteration_current*25)];
                
                sp_list_table.add(sp_list_table_tmp);
                //system.debug('%%%%%%%%%%%%%% DEBUG sp_list: ' + sp_list[i]);
            }

            show_next = true;

            if(iteration_current == 0){
                show_prev = false;
            } else show_prev = true;
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }        
    }   
    
    //------------------- SEARCH LIST SECTION ----------------------//
    //This is our seach method that is called every time a character is entered
    public void search_list(){

        try {
        
            showList = true;
            results = new List<SelectOption>();
            Set<String> result_set = new Set<String>();     
            
            //system.debug('%%%%%%%%%%%%%% DEBUG selectFilter: ' + selectFilter + ' ' + searchValue);
            
            //Using dynamic SOQL we pass the object and the search value
            Id SalesPlanRecTypeid
                = Schema.SObjectType.OEM_Sales_Plan_Ext_Data__c.getRecordTypeInfosByName().get('OEM Sales Plan').getRecordTypeId();
            if(searchValue.length() > 0){
                
                if(selectFilter == 'pn'){
                
                    String entry = searchValue + '%';
                    String queryString = 'Select Id, Material_prd__r.External_ID__c, Roll_Month_Numeric__c, Roll_Year__c from OEM_Sales_Plan_Ext_Data__c where Material_prd__r.External_ID__c like :entry AND RecordTypeId=:SalesPlanRecTypeid';// and Roll_Month_Numeric__c = :current_month and Roll_Year__c = :current_year order by Material_prd__r.External_ID__c limit 1000';
                    
                    /*if(selectedMonth != null && selectedMonth != '' && selectedMonth == 'Current Sales Plan'){
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:current_month and Roll_Year__c =:current_year';
                    } else if (selectedMonth != null && selectedMonth != '' && selectedMonth == 'Past Sales Plan') {
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:past_month and Roll_Year__c =:past_year';
                    }           */    
                    
                    queryString = queryString + ' order by Material_prd__r.External_ID__c limit 1000';
                    
                    /*Next we add the results to our list of selectOptions. We also add the values to a map so that when a value
                    is selected we can auto fill the search box with the selected value */
                    for(sObject o : Database.query(queryString)){
                    
                        if(result_set.contains((String)o.getSobject('Material_prd__r').get('External_ID__c')) == false){ //add unique values
                            result_set.add((String)o.getSobject('Material_prd__r').get('External_ID__c'));
                            results.add(new SelectOption((String)o.getSobject('Material_prd__r').get('External_ID__c'),(String)o.getSobject('Material_prd__r').get('External_ID__c')));
                            //resultsMap.put((String)o.get('Id'),(String)o.getSobject('Material_prd__r').get('External_ID__c'));
                        }
                    }           
                }
                
                if(selectFilter == 'cpn'){

                    String entry = searchValue + '%';
                    String queryString = 'Select Id, P_N_Customer__c, Roll_Month_Numeric__c, Roll_Year__c from OEM_Sales_Plan_Ext_Data__c where P_N_Customer__c like :entry AND RecordTypeId=:SalesPlanRecTypeid'; // and Roll_Month_Numeric__c = :current_month and Roll_Year__c = :current_year order by P_N_Customer__c limit 1000';
                    
                    /*if(selectedMonth != null && selectedMonth != '' && selectedMonth == 'Current Sales Plan'){
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:current_month and Roll_Year__c =:current_year';
                    } else if (selectedMonth != null && selectedMonth != '' && selectedMonth == 'Past Sales Plan') {
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:past_month and Roll_Year__c =:past_year';
                    }    */               

                    queryString = queryString + ' order by P_N_Customer__c limit 1000';
                    
                    /*Next we add the results to our list of selectOptions. We also add the values to a map so that when a value
                    is selected we can auto fill the search box with the selected value */
                    for(sObject o : Database.query(queryString)){
                    
                        if(result_set.contains((String)o.get('P_N_Customer__c')) == false){ //add unique values
                            result_set.add((String)o.get('P_N_Customer__c'));
                            results.add(new SelectOption((String)o.get('P_N_Customer__c'),(String)o.get('P_N_Customer__c')));
                            //resultsMap.put((String)o.get('Id'),(String)o.get('P_N_Customer__c'));
                        }
                    }
                }
                
                if(selectFilter == 'npo'){
                
                    String entry = searchValue + '%';
                    String queryString = 'Select Id, NPO__c, Roll_Month_Numeric__c, Roll_Year__c from OEM_Sales_Plan_Ext_Data__c where NPO__c like :entry AND RecordTypeId=:SalesPlanRecTypeid'; // and Roll_Month_Numeric__c = :current_month and Roll_Year__c = :current_year order by NPO__c limit 1000';

                    /*if(selectedMonth != null && selectedMonth != '' && selectedMonth == 'Current Sales Plan'){
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:current_month and Roll_Year__c =:current_year';
                    } else if (selectedMonth != null && selectedMonth != '' && selectedMonth == 'Past Sales Plan') {
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:past_month and Roll_Year__c =:past_year';
                    }*/
                    
                    queryString = queryString + ' order by NPO__c limit 1000';
                    
                    /*Next we add the results to our list of selectOptions. We also add the values to a map so that when a value
                    is selected we can auto fill the search box with the selected value */
                    for(sObject o : Database.query(queryString)){
                    
                        if(result_set.contains((String)o.get('NPO__c')) == false){ //add unique values
                            result_set.add((String)o.get('NPO__c'));
                            results.add(new SelectOption((String)o.get('NPO__c'),(String)o.get('NPO__c')));
                            //resultsMap.put((String)o.get('Id'),(String)o.get('NPO__c'));
                        }
                    }           
                }
                
                if(selectFilter == 'brand'){
                
                    String entry = searchValue + '%';
                    String queryString = 'Select Id, Brand__r.Name, Brand_Name2__c, Roll_Month_Numeric__c, Roll_Year__c from OEM_Sales_Plan_Ext_Data__c where Brand_Name2__c like :entry AND RecordTypeId=:SalesPlanRecTypeid'; //and Roll_Month_Numeric__c = :current_month and Roll_Year__c = :current_year order by Brand_Name2__c limit 1000';

                    /*if(selectedMonth != null && selectedMonth != '' && selectedMonth == 'Current Sales Plan'){
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:current_month and Roll_Year__c =:current_year';
                    } else if (selectedMonth != null && selectedMonth != '' && selectedMonth == 'Past Sales Plan') {
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:past_month and Roll_Year__c =:past_year';
                    }*/
                    
                    queryString = queryString + ' order by Brand_Name2__c limit 1000';
                    
                    /*Next we add the results to our list of selectOptions. We also add the values to a map so that when a value
                    is selected we can auto fill the search box with the selected value */
                    for(sObject o : Database.query(queryString)){
                        
                        if(result_set.contains((String)o.get('Brand_Name2__c')) == false){ //add unique values
                            result_set.add((String)o.get('Brand_Name2__c'));
                            results.add(new SelectOption((String)o.get('Brand_Name2__c'),(String)o.get('Brand_Name2__c')));
                            //resultsMap.put((String)o.get('Id'),(String)o.get('Brand_Name2__c'));
                        }
                    }           
                }
                
                if(selectFilter == 'eng desc'){
                
                    String entry = '%' + searchValue + '%';
                    String queryString = 'Select Id, Material_prd__r.Material_Engine_Description__c, Material_Engine_Description__c,Roll_Month_Numeric__c, Roll_Year__c from OEM_Sales_Plan_Ext_Data__c where Material_prd__r.Material_Engine_Description__c like :entry AND RecordTypeId=:SalesPlanRecTypeid'; //and Roll_Month_Numeric__c = :current_month and Roll_Year__c = :current_year order by Material_prd__r.Material_Engine_Description__c limit 1000';

                    /*if(selectedMonth != null && selectedMonth != '' && selectedMonth == 'Current Sales Plan'){
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:current_month and Roll_Year__c =:current_year';
                    } else if (selectedMonth != null && selectedMonth != '' && selectedMonth == 'Past Sales Plan') {
                        queryString = queryString +  ' and Roll_Month_Numeric__c =:past_month and Roll_Year__c =:past_year';
                    }     */          
                    
                    queryString = queryString + ' order by Material_prd__r.Material_Engine_Description__c limit 1000';
                    
                    /*Next we add the results to our list of selectOptions. We also add the values to a map so that when a value
                    is selected we can auto fill the search box with the selected value */
                    for(sObject o : Database.query(queryString)){
                    
                        if(result_set.contains((String)o.getSobject('Material_prd__r').get('Material_Engine_Description__c')) == false){ //add unique values
                            result_set.add((String)o.getSobject('Material_prd__r').get('Material_Engine_Description__c'));
                            results.add(new SelectOption((String)o.getSobject('Material_prd__r').get('Material_Engine_Description__c'),(String)o.getSobject('Material_prd__r').get('Material_Engine_Description__c')));
                            //resultsMap.put((String)o.get('Id'),(String)o.getSobject('Material_prd__r').get('Material_Engine_Description__c'));
                        }
                    }           
                }
                

            }
     
            //Next we inspect the results to set the height and contents of the selectList
            if(searchValue.length() == 0){
                showList = false;
            }else if(results.size() == 0 && searchValue.length() != 0){
                results.add(new SelectOption('','No matches found'));
                height = 2;
            }else if(results.size() == 1){
                height = 2;
            }else if(results.size() > maxHeight){
                height = maxHeight;
            }else{
                height = results.size();
            }
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }       
    }
 
    //When a value is selected we will auto complete the searchValue
    public void selectValue(){
        showList = false;
        searchValue = list_value;
        
        //system.debug('%%%%%%%%%% DEBUG searchValue + list_value: ' + searchValue + ' ' + list_value);
    }

    //simply hides the list of results
    public void hideResults(){
        showList = false;
    }
    //------------------- SEARCH LIST SECTION ----------------------//
    
    public void edit_all(){
        
        sbp_all = getsbp_all();
        
        show_edit_all = true;
        show_update_all = true;
        show_edit_single = false;
        
        message = 'After you click "Update Multiple PN" wait for the "Update Completed" message (could take several seconds)';
        message2 = '';
    }
    
    public void edit_single(){
        if(!checkNumberOfCheckboxesEnabled(sp_list_table)){return ;}
        system.debug('sp_Id ' + sp_Id);
        sbp_single = getsbp_single();
        
        show_edit_all = false;
        show_update_all = false;
        show_edit_single = true;
        
        hide_sim =true;
        show_sim =false;
        
        message='';
        
        execute_CalcImpS(sp_Id);
    }
    
    @TestVisible
    private static Boolean checkNumberOfCheckboxesEnabled(List<sales_plan_list> sp_list_table){
        System.debug('HTT_ShouldBePrice_editpage_Controller::checkNumberOfCheckboxesEnabled::Enter method;' + sp_list_table);
        Integer count = 0;
        for(sales_plan_list sp_temp1 : sp_list_table){
            if(sp_temp1.select_bool==true){count++;}
        }
        return count==1;
    }
    
    public static void CalcImpactSimulation(Id sp_id, String current_year){
    
        try {
        
            String sp_id_rectype = [select recordtype.name from OEM_Sales_Plan_Ext_Data__c where id =:sp_id].recordtype.name;
            
            List<OEM_SBPP_Ext_Data__c> sbpListIS = [Select Id, Name, First_Day__c,Month__c, Year__c, Month_Numeric__c, CreatedDate, 
                                                         ALUMINUM__c,PURE_PRICE_BIZ_WINS__c,
                                                         PURE_PRICE_CONTRACTUAL__c,  HLRR__c,
                                                         NICKEL__c,  MOLYBDENUM__c,OTH_METALS__c,
                                                         ENG_CHANGES__c, FX__c,   ENDTOOLAMOR__c,ENDRD_EAMOR__c,
                                                         INTERESTRDE_TOOLAMO__c, LOGISTIC_PACKAGING__c,OTHER__c,Volume__c,CurrencyIsoCode ,
                                                         ALUMINUM_SimReq__c,PURE_PRICE_BIZ_WINS_SimReq__c,ENDRD_EAMOR_SimReq__c,ENDTOOLAMOR_SimReq__c,
                                                         ENG_CHANGES_SimReq__c,FX_SimReq__c,HLRR_SimReq__c,INTERESTRDE_TOOLAMO_SimReq__c,
                                                         LOGISTIC_PACKAGING_SimReq__c,MOLYBDENUM_SimReq__c,NICKEL_SimReq__c,OTHER_SimReq__c,
                                                         OTH_METALS_SimReq__c,PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                         ALUMINUM_For__c,ALUMINUM_Co__c,PURE_PRICE_BIZ_WINS_For__c,PURE_PRICE_BIZ_WINS_Co__c,
                                                         ENDRD_EAMOR_For__c, ENDRD_EAMOR_Co__c, ENDTOOLAMOR_For__c, ENDTOOLAMOR_Co__c,
                                                         ENG_CHANGES_For__c, ENG_CHANGES_Co__c, FX_For__c,  FX_Co__c,
                                                         HLRR_For__c, HLRR_Co__c, INTERESTRDE_TOOLAMO_For__c, INTERESTRDE_TOOLAMO_Co__c,
                                                         LOGISTIC_PACKAGING_For__c, LOGISTIC_PACKAGING_Co__c,
                                                         MOLYBDENUM_For__c, MOLYBDENUM_Co__c, NICKEL_For__c, NICKEL_Co__c, OTHER_For__c, OTHER_Co__c,
                                                         OTH_METALS_For__c, OTH_METALS_Co__c, PURE_PRICE_CONTRACTUAL_For__c, PURE_PRICE_CONTRACTUAL_Co__c
                                                         from OEM_SBPP_Ext_Data__c Where Sales_Plan__c = :sp_id and isAOP__c=False 
                                                         ORDER BY Year__c,Month_Numeric__c ASC];
        
            if(sp_id_rectype=='Lump Sum Sales Plan'){
             system.debug('Record Type id Lump Sum Sales Plan');
             
              for (Integer i = 0; i < sbpListIS.size(); i++) {
                  system.debug('enter here inside lump sum if');
                  sbpListIS[i].ALUMINUM_For__c=sbpListIS[i].ALUMINUM__c; 
                  sbpListIS[i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[i].PURE_PRICE_BIZ_WINS__c;                             
                  sbpListIS[i].ENDRD_EAMOR_For__c=sbpListIS[i].ENDRD_EAMOR__c;
                  sbpListIS[i].ENDTOOLAMOR_For__c=sbpListIS[i].ENDTOOLAMOR__c;
                  sbpListIS[i].ENG_CHANGES_For__c= sbpListIS[i].ENG_CHANGES__c; 
                  sbpListIS[i].FX_For__c=sbpListIS[i].FX__c;   
                  sbpListIS[i].HLRR_For__c= sbpListIS[i].HLRR__c;
                  sbpListIS[i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[i].INTERESTRDE_TOOLAMO__c;                         
                  sbpListIS[i].LOGISTIC_PACKAGING_For__c=sbpListIS[i].LOGISTIC_PACKAGING__c;
                  sbpListIS[i].MOLYBDENUM_For__c=sbpListIS[i].MOLYBDENUM__c;  
                  sbpListIS[i].NICKEL_For__c=sbpListIS[i].NICKEL__c; 
                  sbpListIS[i].OTHER_For__c=sbpListIS[i].OTHER__c; 
                  sbpListIS[i].OTH_METALS_For__c=sbpListIS[i].OTH_METALS__c;
                  sbpListIS[i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[i].PURE_PRICE_CONTRACTUAL__c;   
                  
                  system.debug('sbpListIS[i].PURE_PRICE_CONTRACTUAL_For__c ' + sbpListIS[i].PURE_PRICE_CONTRACTUAL_For__c);     
                  system.debug('sbpListIS[i].PURE_PRICE_CONTRACTUAL__c ' + sbpListIS[i].PURE_PRICE_CONTRACTUAL__c);                                        
             
              }
              
              update sbpListIS;
            }
            else {
                                 
            
            
            for (Integer i = 0; i < 36 ; i++) {
                
                sbpListIS[i].ALUMINUM_For__c=0;
                sbpListIS[i].ALUMINUM_Co__c=0;
                sbpListIS[i].PURE_PRICE_BIZ_WINS_For__c=0;
                sbpListIS[i].PURE_PRICE_BIZ_WINS_Co__c=0;
                sbpListIS[i].ENDRD_EAMOR_For__c=0;
                sbpListIS[i].ENDRD_EAMOR_Co__c=0;
                sbpListIS[i].ENDTOOLAMOR_For__c=0;
                sbpListIS[i].ENDTOOLAMOR_Co__c=0;
                sbpListIS[i].ENG_CHANGES_For__c=0;
                sbpListIS[i].ENG_CHANGES_Co__c=0;
                sbpListIS[i].FX_For__c=0;
                sbpListIS[i].FX_Co__c=0;
                sbpListIS[i].HLRR_For__c=0;
                sbpListIS[i].HLRR_Co__c=0;
                sbpListIS[i].INTERESTRDE_TOOLAMO_For__c=0;
                sbpListIS[i].INTERESTRDE_TOOLAMO_Co__c=0;
                sbpListIS[i].LOGISTIC_PACKAGING_For__c=0;
                sbpListIS[i].LOGISTIC_PACKAGING_Co__c=0;
                sbpListIS[i].MOLYBDENUM_For__c=0;
                sbpListIS[i].MOLYBDENUM_Co__c=0;
                sbpListIS[i].NICKEL_For__c=0;
                sbpListIS[i].NICKEL_Co__c=0;
                sbpListIS[i].OTHER_For__c=0;
                sbpListIS[i].OTHER_Co__c=0;
                sbpListIS[i].OTH_METALS_For__c=0;
                sbpListIS[i].OTH_METALS_Co__c=0;
                sbpListIS[i].PURE_PRICE_CONTRACTUAL_For__c=0;
                sbpListIS[i].PURE_PRICE_CONTRACTUAL_Co__c=0;
                
            }
            
            Integer CountRec = 0;
            
            for(OEM_SBPP_Ext_Data__c sbp: sbpListIS){    

                if(sbp.Year__c<=current_year){
                    
                    if(sbp.Month_Numeric__c==1){  
                          
                        for (Integer i = 0; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c; 
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;                             
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c; 
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;   
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;                         
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c;  
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c; 
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c; 
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                    if(sbp.Month_Numeric__c==2){        
                        for (Integer i = 0; i <=10; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;        
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c;  
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c;  
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c; 
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c; 
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;  
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c;  
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c;   
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c;  
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c; 
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                             
                            
                        }
                        for (Integer i = 11; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;  
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;  
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;  
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;     
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;  
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;  
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;    
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;        
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c; 
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;  
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                       
                        }
                    }
                    
                    if(sbp.Month_Numeric__c==3){        
                        for (Integer i = 0; i <=9; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;     
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c;   
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c; 
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;        
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c; 
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c; 
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c;  
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;  
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;   
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                           
                        }
                        for (Integer i = 10; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                    if(sbp.Month_Numeric__c==4){        
                        for (Integer i = 0; i <=8; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c;  
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c;  
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c; 
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;  
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;   
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c; 
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c; 
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c; 
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                                        
                        }
                        for (Integer i = 9; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                    if(sbp.Month_Numeric__c==5){        
                        for (Integer i = 0; i <=7; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;  
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c; 
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c;  
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;   
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;  
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c; 
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c; 
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c;   
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c;  
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;  
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                                  
                        }
                        for (Integer i = 8; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                    if(sbp.Month_Numeric__c==6){        
                        for (Integer i = 0; i <=6; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c; 
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c;    
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;  
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;   
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c; 
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c; 
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c; 
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;   
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                                     
                        }
                        for (Integer i = 7; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                    if(sbp.Month_Numeric__c==7){        
                        for (Integer i = 0; i <=5; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;  
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c; 
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c; 
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c;  
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;  
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;     
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;  
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c; 
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c;     
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c;  
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                              
                        }
                        for (Integer i = 6; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                    if(sbp.Month_Numeric__c==8){        
                        for (Integer i = 0; i <=4; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;  
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c; 
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c;  
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c;  
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;  
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c; 
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c; 
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;   
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;   
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                                    
                        }
                        for (Integer i = 5; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                    if(sbp.Month_Numeric__c==9){        
                        for (Integer i = 0; i <=3; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c; 
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c;   
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c; 
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c;   
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c; 
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c; 
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;  
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c;  
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c;  
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c; 
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;      
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                              
                        }
                        for (Integer i = 4; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                    if(sbp.Month_Numeric__c==10){        
                        for (Integer i = 0; i <=2; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c; 
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c;  
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c; 
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c;     
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;   
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;    
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c; 
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c; 
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c;     
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c;  
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;  
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c; 
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                         
                        }
                        for (Integer i = 3; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                    if(sbp.Month_Numeric__c==11){        
                        for (Integer i = 0; i <=1; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c;  
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c; 
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c;  
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;     
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;   
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;   
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c;   
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c; 
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c; 
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;    
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;   
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                         
                        }
                        for (Integer i = 2; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                     if(sbp.Month_Numeric__c==12){        
                        for (Integer i = 0; i <=0; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c; 
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c;  
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c;  
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c;   
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;          
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;    
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;     
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c;   
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c;  
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c;  
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c; 
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;  
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                
                        }
                        for (Integer i = 1; i <=11; i++) {
                            sbpListIS[CountRec+i].ALUMINUM_Co__c=sbpListIS[CountRec+i].ALUMINUM_Co__c + sbp.ALUMINUM__c;
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_Co__c + sbp.PURE_PRICE_BIZ_WINS__c;
                            sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c=sbpListIS[CountRec+i].ENDRD_EAMOR_Co__c + sbp.ENDRD_EAMOR__c;
                            sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c=sbpListIS[CountRec+i].ENDTOOLAMOR_Co__c + sbp.ENDTOOLAMOR__c;
                            sbpListIS[CountRec+i].ENG_CHANGES_Co__c=sbpListIS[CountRec+i].ENG_CHANGES_Co__c + sbp.ENG_CHANGES__c;
                            sbpListIS[CountRec+i].FX_Co__c=sbpListIS[CountRec+i].FX_Co__c + sbp.FX__c;
                            sbpListIS[CountRec+i].HLRR_Co__c=sbpListIS[CountRec+i].HLRR_Co__c + sbp.HLRR__c;
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_Co__c + sbp.INTERESTRDE_TOOLAMO__c;
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_Co__c + sbp.LOGISTIC_PACKAGING__c;
                            sbpListIS[CountRec+i].MOLYBDENUM_Co__c=sbpListIS[CountRec+i].MOLYBDENUM_Co__c + sbp.MOLYBDENUM__c;
                            sbpListIS[CountRec+i].NICKEL_Co__c=sbpListIS[CountRec+i].NICKEL_Co__c + sbp.NICKEL__c;
                            sbpListIS[CountRec+i].OTHER_Co__c=sbpListIS[CountRec+i].OTHER_Co__c + sbp.OTHER__c;
                            sbpListIS[CountRec+i].OTH_METALS_Co__c=sbpListIS[CountRec+i].OTH_METALS_Co__c + sbp.OTH_METALS__c;
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_Co__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                              
                        }
                    }
                }
                else {
                    for (Integer i = 0; i <=(35-CountRec); i++) {
                            sbpListIS[CountRec+i].ALUMINUM_For__c=sbpListIS[CountRec+i].ALUMINUM_For__c + sbp.ALUMINUM__c;   
                            sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c=sbpListIS[CountRec+i].PURE_PRICE_BIZ_WINS_For__c + sbp.PURE_PRICE_BIZ_WINS__c;  
                            sbpListIS[CountRec+i].ENDRD_EAMOR_For__c=sbpListIS[CountRec+i].ENDRD_EAMOR_For__c + sbp.ENDRD_EAMOR__c;      
                            sbpListIS[CountRec+i].ENDTOOLAMOR_For__c=sbpListIS[CountRec+i].ENDTOOLAMOR_For__c + sbp.ENDTOOLAMOR__c;   
                            sbpListIS[CountRec+i].ENG_CHANGES_For__c=sbpListIS[CountRec+i].ENG_CHANGES_For__c + sbp.ENG_CHANGES__c; 
                            sbpListIS[CountRec+i].FX_For__c=sbpListIS[CountRec+i].FX_For__c + sbp.FX__c;   
                            sbpListIS[CountRec+i].HLRR_For__c=sbpListIS[CountRec+i].HLRR_For__c + sbp.HLRR__c;  
                            sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c=sbpListIS[CountRec+i].INTERESTRDE_TOOLAMO_For__c + sbp.INTERESTRDE_TOOLAMO__c;      
                            sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c=sbpListIS[CountRec+i].LOGISTIC_PACKAGING_For__c + sbp.LOGISTIC_PACKAGING__c; 
                            sbpListIS[CountRec+i].MOLYBDENUM_For__c=sbpListIS[CountRec+i].MOLYBDENUM_For__c + sbp.MOLYBDENUM__c;     
                            sbpListIS[CountRec+i].NICKEL_For__c=sbpListIS[CountRec+i].NICKEL_For__c + sbp.NICKEL__c;   
                            sbpListIS[CountRec+i].OTHER_For__c=sbpListIS[CountRec+i].OTHER_For__c + sbp.OTHER__c;  
                            sbpListIS[CountRec+i].OTH_METALS_For__c=sbpListIS[CountRec+i].OTH_METALS_For__c + sbp.OTH_METALS__c;  
                            sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c=sbpListIS[CountRec+i].PURE_PRICE_CONTRACTUAL_For__c + sbp.PURE_PRICE_CONTRACTUAL__c;                                                                                           
                        }                
                }
                
                CountRec++;
                
                //update sbpListIS;
            }
         
          //system.debug('sbpListIS ' + sbpListIS);
          //system.debug('sbpListIS size ' + sbpListIS.size());
         
          update sbpListIS;
         }
         
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
            
        } 
    }    
    
    public List<OEM_SBPP_Ext_Data__c> getsbp_all(){
        
        try {
        
            this.sbp_all = new List<OEM_SBPP_Ext_Data__c>();
            this.sbp_all_past = new List<OEM_SBPP_Ext_Data__c>();
            this.sbp_all_forecast = new List<OEM_SBPP_Ext_Data__c>();
            
            //OEM_Sales_Plan_Ext_Data__c newSP_tmp = new OEM_Sales_Plan_Ext_Data__c(Name = 'temp', );
            
            for(Integer i = 1; i <= 36; i++) {
            
                OEM_SBPP_Ext_Data__c temp_sbpp = new OEM_SBPP_Ext_Data__c();
                
                //temp_sbpp.Sales_Plan__c = newSP_tmp.Id; //dummy master
                
                if(i <=12){
                    
                    temp_sbpp.Year__c = string.ValueOf(Integer.ValueOf(current_year) - 1);
                
                } else {
                    if(i >13 && i <=24){
                        temp_sbpp.Year__c = current_year;                    
                    }
                    
                    else temp_sbpp.Year__c = string.ValueOf(Integer.ValueOf(current_year) + 1);                
                }
                
                if(i ==1 || i == 13 || i==25) temp_sbpp.Month__c = 'January';
                if(i ==2 || i == 14 || i==26) temp_sbpp.Month__c = 'February';
                if(i ==3 || i == 15 || i==27) temp_sbpp.Month__c = 'March';
                if(i ==4 || i == 16 || i==28) temp_sbpp.Month__c = 'April';
                if(i ==5 || i == 17 || i==29) temp_sbpp.Month__c = 'May';
                if(i ==6 || i == 18 || i==30) temp_sbpp.Month__c = 'June';
                if(i ==7 || i == 19 || i==31) temp_sbpp.Month__c = 'July';
                if(i ==8 || i == 20 || i==32) temp_sbpp.Month__c = 'August';
                if(i ==9 || i == 21 || i==33) temp_sbpp.Month__c = 'September';
                if(i ==10 || i == 22 || i==34) temp_sbpp.Month__c = 'October';
                if(i ==11 || i == 23 || i==35) temp_sbpp.Month__c = 'November';
                if(i ==12 || i == 24 || i==36) temp_sbpp.Month__c = 'December';
                
                temp_sbpp.PURE_PRICE_CONTRACTUAL__c = 0;
                temp_sbpp.PURE_PRICE_BIZ_WINS__c = 0;
                temp_sbpp.HLRR__c = 0;
                temp_sbpp.NICKEL__c = 0;
                temp_sbpp.ALUMINUM__c = 0;
                temp_sbpp.MOLYBDENUM__c = 0;
                temp_sbpp.OTH_METALS__c = 0;
                temp_sbpp.ENG_CHANGES__c = 0;
                temp_sbpp.OTHER__c = 0;  
                temp_sbpp.FX__c = 0;    
                temp_sbpp.ENDTOOLAMOR__c = 0;
                temp_sbpp.ENDRD_EAMOR__c = 0;
                temp_sbpp.INTERESTRDE_TOOLAMO__c = 0;
                temp_sbpp.LOGISTIC_PACKAGING__c = 0;

                temp_sbpp.PURE_PRICE_CONTRACTUAL_String__c = '0.00';
                temp_sbpp.PURE_PRICE_BIZ_WINS_String__c = '0.00';
                temp_sbpp.HLRR_String__c = '0.00';
                temp_sbpp.NICKEL_String__c = '0.00';
                temp_sbpp.ALUMINUM_String__c = '0.00';
                temp_sbpp.MOLYBDENUM_String__c = '0.00';
                temp_sbpp.OTHER_METALS_String__c = '0.00';
                temp_sbpp.ENG_CHANGES_String__c = '0.00';
                temp_sbpp.OTHER_String__c = '0.00';
                temp_sbpp.FX_String__c = '0.00';
                temp_sbpp.ENDTOOLAMOR_String__c = '0.00';
                temp_sbpp.ENDRD_EAMOR_String__c = '0.00';
                temp_sbpp.INTERESTRDE_TOOLAMO_String__c = '0.00';
                temp_sbpp.LOGISTIC_PACKAGING_String__c = '0.00';
                
                sbp_all.add(temp_sbpp);
            }       
            
            if(!sbp_all.isEmpty()){
            
                for(Integer i = 1; i <= sbp_all.size(); i++){
                
                    if((sbp_all[i-1].Month_Numeric__c < sp_month && sbp_all[i-1].year__c == sp_year) || sbp_all[i-1].year__c < sp_year){ //MSavioli: old filter (i < current_month && sbp_all[i-1].year__c == current_year)
                        this.sbp_all_past.add(sbp_all[i-1]);
                    } else {
                        this.sbp_all_forecast.add(sbp_all[i-1]);
                    }
                }       
                
                // Transpose the record for new layout
                TransposetoWrapperAll();
                
            }

            system.debug('%%%%%%%%%%%%%% DEBUG sbp_all_past: ' + sbp_all_past.size());
            system.debug('%%%%%%%%%%%%%% DEBUG sbp_all_forecast: ' + sbp_all_forecast.size());      
            
            return sbp_all;
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
            return sbp_all;
        }           
    }
    
    public list<OEM_SBPP_Ext_Data__c> getsbp_single(){
    
        //system.debug('%%%%%%%%%%%%% DEBUG ID single: ' + sp_id);
        //system.debug('%%%%%%%%%%%%% DEBUG ID single: ' + ApexPages.currentPage().getParameters().get('sp_id'));
        
        //initialization
        this.sbp_single = new List<OEM_SBPP_Ext_Data__c>();
        this.sbp_single_past = new List<OEM_SBPP_Ext_Data__c>();
        this.sbp_single_forecast = new List<OEM_SBPP_Ext_Data__c>();
        message2 = '';
        
        try {
            
            if(sp_id != null){
            
                this.sbp_single = [Select Id, Name, First_Day__c,Month__c, Year__c, CurrencyIsoCode,Sales_Plan__r.recordTypeId,
                                   LC_Price_calcd__c, HLRR__c, NICKEL__c, ALUMINUM__c,MOLYBDENUM__c,
                                   OTHER__c, OTH_METALS__c, ENG_CHANGES__c,LOGISTIC_PACKAGING__c,
                                   PURE_PRICE_BIZ_WINS__c, PURE_PRICE_CONTRACTUAL__c,FX__c,ENDTOOLAMOR__c,ENDRD_EAMOR__c, INTERESTRDE_TOOLAMO__c,
                                   Lc_Price__c, SAP_Price__c, Version__c, 
                                   Sales_Plan__r.Material_prd__r.External_Id__c, Sales_Plan__r.Brand__r.Name, Sales_Plan__c, Sales_Plan__r.NPO__c, 
                                   Sales_Plan__r.Material_prd__r.Material_Engine_Description__c, Month_Numeric__c, CreatedDate, 
                                   PURE_PRICE_CONTRACTUAL_String__c, PURE_PRICE_BIZ_WINS_String__c, HLRR_String__c, NICKEL_String__c, 
                                   ALUMINUM_String__c,
                                   MOLYBDENUM_String__c,OTHER_METALS_String__c, ENG_CHANGES_String__c,
                                   OTHER_String__c,Sales_Plan__r.Roll_Year__c,Sales_Plan__r.Roll_Month_Numeric__c,
                                   ALUMINUM_x_VOLUME__c,BIZ_WINS_x_VOLUME__c, ENDRD_EAMOR_x_VOLUME__c,ENDTOOLAMOR_x_VOLUME__c,
                                   ENG_CHANGES_x_VOLUME__c,   FX_x_VOLUME__c, HLRR_x_VOLUME__c,INTERESTRDE_TOOLAMO_x_VOLUME__c,
                                   LOGISTIC_PACKAGING_x_VOLUME__c,    MOLYBDENUM_x_VOLUME__c, NICKEL_x_VOLUME__c, OTHER_x_VOLUME__c,
                                   OTH_METALS_x_VOLUME__c,PURE_PRICE_x_VOLUME__c,Sales_Plan__r.Enable_Price_Split__c,Sales_Plan__r.Channel__c,
                                   Current_Price__c
                                   from OEM_SBPP_Ext_Data__c Where Sales_Plan__c = :sp_id and isAOP__c=False ORDER BY Year__c,Month__c ASC]; //ORDER BY Name ASC
                
                if(!sbp_single.isEmpty()){
                
                    currency_value=sbp_single[0].CurrencyIsoCode;

                    dash_npo = sbp_single[0].Sales_Plan__r.NPO__c;
                    dash_pn = sbp_single[0].Sales_Plan__r.Material_prd__r.External_Id__c;
                    dash_brand = sbp_single[0].Sales_Plan__r.Brand__r.Name;
                    dash_ed = sbp_single[0].Sales_Plan__r.Material_prd__r.Material_Engine_Description__c;
                    dash_channel = sbp_single[0].Sales_Plan__r.Channel__c;
                    show_pricesplit =sbp_single[0].Sales_Plan__r.Enable_Price_Split__c;
                    
                    if(dash_pn == 'Lump Sum'){
                         isLumpSum=True;
                         show_pricesplit=false;
                         show_ps=false;
                         show_simulation=false;
                         show_sim=false;
                    }
                    else {
                    
                        show_simulation=true;
                    }
                    
                    
                    //build Past and Forecast Tables
                    for(OEM_SBPP_Ext_Data__c temp_sbp: sbp_single){
                    
                        if((temp_sbp.Month_Numeric__c < sp_month && temp_sbp.year__c == sp_year)||  temp_sbp.year__c < sp_year){ // MSAVIOLI: old criteria (temp_sbp.Month_Numeric__c < current_month && temp_sbp.year__c == current_year)
                            temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = string.valueOf(temp_sbp.PURE_PRICE_CONTRACTUAL__c);
                            temp_sbp.PURE_PRICE_BIZ_WINS_String__c = string.valueOf(temp_sbp.PURE_PRICE_BIZ_WINS__c);
                            temp_sbp.HLRR_String__c = string.valueOf(temp_sbp.HLRR__c);
                            temp_sbp.NICKEL_String__c = string.valueOf(temp_sbp.NICKEL__c);
                            temp_sbp.ALUMINUM_String__c = string.valueOf(temp_sbp.ALUMINUM__c);
                            temp_sbp.MOLYBDENUM_String__c = string.valueOf(temp_sbp.MOLYBDENUM__c);
                            temp_sbp.OTHER_METALS_String__c = string.valueOf(temp_sbp.OTH_METALS__c);
                            temp_sbp.ENG_CHANGES_String__c = string.valueOf(temp_sbp.ENG_CHANGES__c);
                            temp_sbp.OTHER_String__c = string.valueOf(temp_sbp.OTHER__c);
                            temp_sbp.FX_String__c = string.valueOf(temp_sbp.FX__c);
                            temp_sbp.ENDTOOLAMOR_String__c = string.valueOf(temp_sbp.ENDTOOLAMOR__c);
                            temp_sbp.ENDRD_EAMOR_String__c = string.valueOf(temp_sbp.ENDRD_EAMOR__c);
                            temp_sbp.INTERESTRDE_TOOLAMO_String__c = string.valueOf(temp_sbp.INTERESTRDE_TOOLAMO__c);
                            temp_sbp.LOGISTIC_PACKAGING_String__c = string.valueOf(temp_sbp.LOGISTIC_PACKAGING__c);
                            temp_sbp.First_Day__c = temp_sbp.First_Day__c;
                            sbp_single_past.add(temp_sbp);
                            
                        } else {
                            temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = string.valueOf(temp_sbp.PURE_PRICE_CONTRACTUAL__c);
                            temp_sbp.PURE_PRICE_BIZ_WINS_String__c = string.valueOf(temp_sbp.PURE_PRICE_BIZ_WINS__c);
                            temp_sbp.HLRR_String__c = string.valueOf(temp_sbp.HLRR__c);
                            temp_sbp.NICKEL_String__c = string.valueOf(temp_sbp.NICKEL__c);
                            temp_sbp.ALUMINUM_String__c = string.valueOf(temp_sbp.ALUMINUM__c);
                            temp_sbp.MOLYBDENUM_String__c = string.valueOf(temp_sbp.MOLYBDENUM__c);
                            temp_sbp.OTHER_METALS_String__c = string.valueOf(temp_sbp.OTH_METALS__c);
                            temp_sbp.ENG_CHANGES_String__c = string.valueOf(temp_sbp.ENG_CHANGES__c);
                            temp_sbp.OTHER_String__c = string.valueOf(temp_sbp.OTHER__c);
                            temp_sbp.FX_String__c = string.valueOf(temp_sbp.FX__c);
                            temp_sbp.ENDTOOLAMOR_String__c = string.valueOf(temp_sbp.ENDTOOLAMOR__c);
                            temp_sbp.ENDRD_EAMOR_String__c = string.valueOf(temp_sbp.ENDRD_EAMOR__c);
                            temp_sbp.INTERESTRDE_TOOLAMO_String__c = string.valueOf(temp_sbp.INTERESTRDE_TOOLAMO__c);
                            temp_sbp.LOGISTIC_PACKAGING_String__c = string.valueOf(temp_sbp.LOGISTIC_PACKAGING__c);
                            temp_sbp.First_Day__c = temp_sbp.First_Day__c;
                            sbp_single_forecast.add(temp_sbp);
                        }
                    }
                    
                    // Transpose the record for new layout
                    TransposetoWrapper();
                    
                }
                //system.debug('%%%%%%%%%%%%%% DEBUG SHOULD BE PRICE IN-IF: ' + sbp);
                system.debug('%%%%%%%%%%%%%% DEBUG past forecast: ' + sbp_single_past.size() + ' ' + sbp_single_forecast.size());
                
                message = 'Update completed.';
                
            } else {
            
                message2 = 'Id Not Found, please try again your search';
            }
            
            //system.debug('%%%%%%%%%%%%%% DEBUG SHOULD BE PRICE OUT-IF: ' + sbp);
                
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }
        
        return sbp_single;  
    }
    
    
    public List<SBPPSWrapper> getsbp_price_split(){
    
       //system.debug('%%%%%%%%%%%%% DEBUG ID price split: ' + sp_id);
        //system.debug('%%%%%%%%%%%%% DEBUG ID single: ' + ApexPages.currentPage().getParameters().get('sp_id'));
        
        //initialization
        pricesplit = new List<SBPPSWrapper>();
        
        message2 = '';
        Integer i=0;
        
        try {
            
            if(sp_id != null){
            
                List<OEM_SBPP_Ext_Data__c> sbpList = [Select Id, Name, First_Day__c,Month__c, Year__c, LC_Price_calcd__c, CurrencyIsoCode ,
                                                      BasePrice_Calc__c,Surcharge_Calc__c,RD_E_amortization_Calc__c,Tooling_Amortization_Calc__c,
                                                      Current_Interest_Calc__c,Logistic_Packaging_Calc__c,
                                                      HLRR__c, NICKEL__c, ALUMINUM__c,MOLYBDENUM__c,OTHER__c, OTH_METALS__c, ENG_CHANGES__c,
                                                      LOGISTIC_PACKAGING__c,PURE_PRICE_BIZ_WINS__c, PURE_PRICE_CONTRACTUAL__c,FX__c,ENDTOOLAMOR__c,
                                                      ENDRD_EAMOR__c, INTERESTRDE_TOOLAMO__c,Lc_Price__c, SAP_Price__c, Version__c,
                                                      Sales_Plan__r.Material_prd__r.External_Id__c, Sales_Plan__r.Brand__r.Name, Sales_Plan__c, 
                                                      Sales_Plan__r.NPO__c,Sales_Plan__r.Material_prd__r.Material_Engine_Description__c,
                                                      Sales_Plan__r.BasePrice__c,Sales_Plan__r.Surcharge__c,Sales_Plan__r.RD_E_amortization__c,
                                                      Sales_Plan__r.Tooling_Amortization__c,Sales_Plan__r.Current_Interest__c, 
                                                      Sales_Plan__r.Logistic_Packaging__c,Current_Price__c,
                                                      Month_Numeric__c, CreatedDate, PURE_PRICE_CONTRACTUAL_String__c, PURE_PRICE_BIZ_WINS_String__c, 
                                                      HLRR_String__c, NICKEL_String__c, ALUMINUM_String__c, MOLYBDENUM_String__c,OTHER_METALS_String__c, 
                                                      ENG_CHANGES_String__c,OTHER_String__c,Sales_Plan__r.Roll_Year__c,
                                                      Sales_Plan__r.Roll_Month_Numeric__c 
                                                      from OEM_SBPP_Ext_Data__c Where Sales_Plan__c = :sp_id and isAOP__c=False ORDER BY Year__c,Month__c ASC];
                                                      
                //system.debug ('sbpList  ' + sbpList );
                
                if(!sbpList.isEmpty()){ 
                
                    SBPPSWrapper obj1= new SBPPSWrapper();
                    
                    obj1.varPrice_RC = 'Current Price';
                    obj1.varType = 'SAP';
                    obj1.varM1Y0 = sbpList[i].CurrencyIsoCode + ' ' + string.valueof((sbpList[i].Current_Price__c).setScale(4));
                    obj1.varM2Y0 = sbpList[i+1].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+1].Current_Price__c).setScale(4));
                    obj1.varM3Y0 = sbpList[i+2].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+2].Current_Price__c).setScale(4));
                    obj1.varM4Y0 = sbpList[i+3].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+3].Current_Price__c).setScale(4));
                    obj1.varM5Y0 = sbpList[i+4].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+4].Current_Price__c).setScale(4));
                    obj1.varM6Y0 = sbpList[i+5].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+5].Current_Price__c).setScale(4));
                    obj1.varM7Y0 = sbpList[i+6].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+6].Current_Price__c).setScale(4));
                    obj1.varM8Y0 = sbpList[i+7].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+7].Current_Price__c).setScale(4));
                    obj1.varM9Y0 = sbpList[i+8].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+8].Current_Price__c).setScale(4));
                    obj1.varM10Y0 = sbpList[i+9].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+9].Current_Price__c).setScale(4));
                    obj1.varM11Y0 = sbpList[i+10].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+10].Current_Price__c).setScale(4));
                    obj1.varM12Y0 = sbpList[i+11].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+11].Current_Price__c).setScale(4));
                    obj1.varM1Y1 = sbpList[i+12].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+12].Current_Price__c).setScale(4));
                    obj1.varM2Y1 = sbpList[i+13].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+13].Current_Price__c).setScale(4));
                    obj1.varM3Y1 = sbpList[i+14].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+14].Current_Price__c).setScale(4));
                    obj1.varM4Y1 = sbpList[i+15].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+15].Current_Price__c).setScale(4));
                    obj1.varM5Y1 = sbpList[i+16].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+16].Current_Price__c).setScale(4));
                    obj1.varM6Y1 = sbpList[i+17].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+17].Current_Price__c).setScale(4));
                    obj1.varM7Y1 = sbpList[i+18].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+18].Current_Price__c).setScale(4));
                    obj1.varM8Y1 = sbpList[i+19].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+19].Current_Price__c).setScale(4));
                    obj1.varM9Y1 = sbpList[i+20].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+20].Current_Price__c).setScale(4));
                    obj1.varM10Y1 = sbpList[i+21].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+21].Current_Price__c).setScale(4));
                    obj1.varM11Y1 = sbpList[i+22].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+22].Current_Price__c).setScale(4));
                    obj1.varM12Y1 = sbpList[i+23].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+23].Current_Price__c).setScale(4));
                    obj1.varM1Y2 = sbpList[i+24].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+24].Current_Price__c).setScale(4));
                    obj1.varM2Y2 = sbpList[i+25].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+25].Current_Price__c).setScale(4));
                    obj1.varM3Y2 = sbpList[i+26].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+26].Current_Price__c).setScale(4));
                    obj1.varM4Y2 = sbpList[i+27].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+27].Current_Price__c).setScale(4));
                    obj1.varM5Y2 = sbpList[i+28].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+28].Current_Price__c).setScale(4));
                    obj1.varM6Y2 = sbpList[i+29].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+29].Current_Price__c).setScale(4));
                    obj1.varM7Y2 = sbpList[i+30].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+30].Current_Price__c).setScale(4));
                    obj1.varM8Y2 = sbpList[i+31].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+31].Current_Price__c).setScale(4));
                    obj1.varM9Y2 = sbpList[i+32].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+32].Current_Price__c).setScale(4));
                    obj1.varM10Y2 = sbpList[i+33].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+33].Current_Price__c).setScale(4));
                    obj1.varM11Y2 = sbpList[i+34].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+34].Current_Price__c).setScale(4));
                    obj1.varM12Y2 = sbpList[i+35].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+35].Current_Price__c).setScale(4));
                    
                    pricesplit.add(obj1);
                    
                    
                    SBPPSWrapper obj2= new SBPPSWrapper();
                    
                    obj2.varPrice_RC = 'Base Price';
                    obj2.varType = 'SAP';
                    obj2.varM1Y0 = string.valueof(sbpList[i].Sales_Plan__r.BasePrice__c);
                    obj2.varM2Y0 = string.valueof(sbpList[i+1].Sales_Plan__r.BasePrice__c);
                    obj2.varM3Y0 = string.valueof(sbpList[i+2].Sales_Plan__r.BasePrice__c);
                    obj2.varM4Y0 = string.valueof(sbpList[i+3].Sales_Plan__r.BasePrice__c);
                    obj2.varM5Y0 = string.valueof(sbpList[i+4].Sales_Plan__r.BasePrice__c);
                    obj2.varM6Y0 = string.valueof(sbpList[i+5].Sales_Plan__r.BasePrice__c);
                    obj2.varM7Y0 = string.valueof(sbpList[i+6].Sales_Plan__r.BasePrice__c);
                    obj2.varM8Y0 = string.valueof(sbpList[i+7].Sales_Plan__r.BasePrice__c);
                    obj2.varM9Y0 = string.valueof(sbpList[i+8].Sales_Plan__r.BasePrice__c);
                    obj2.varM10Y0 = string.valueof(sbpList[i+9].Sales_Plan__r.BasePrice__c);
                    obj2.varM11Y0 = string.valueof(sbpList[i+10].Sales_Plan__r.BasePrice__c);
                    obj2.varM12Y0 = string.valueof(sbpList[i+11].Sales_Plan__r.BasePrice__c);
                    obj2.varM1Y1 = string.valueof(sbpList[i+12].Sales_Plan__r.BasePrice__c);
                    obj2.varM2Y1 = string.valueof(sbpList[i+13].Sales_Plan__r.BasePrice__c);
                    obj2.varM3Y1 = string.valueof(sbpList[i+14].Sales_Plan__r.BasePrice__c);
                    obj2.varM4Y1 = string.valueof(sbpList[i+15].Sales_Plan__r.BasePrice__c);
                    obj2.varM5Y1 = string.valueof(sbpList[i+16].Sales_Plan__r.BasePrice__c);
                    obj2.varM6Y1 = string.valueof(sbpList[i+17].Sales_Plan__r.BasePrice__c);
                    obj2.varM7Y1 = string.valueof(sbpList[i+18].Sales_Plan__r.BasePrice__c);
                    obj2.varM8Y1 = string.valueof(sbpList[i+19].Sales_Plan__r.BasePrice__c);
                    obj2.varM9Y1 = string.valueof(sbpList[i+20].Sales_Plan__r.BasePrice__c);
                    obj2.varM10Y1 = string.valueof(sbpList[i+21].Sales_Plan__r.BasePrice__c);
                    obj2.varM11Y1 = string.valueof(sbpList[i+22].Sales_Plan__r.BasePrice__c);
                    obj2.varM12Y1 = string.valueof(sbpList[i+23].Sales_Plan__r.BasePrice__c);
                    obj2.varM1Y2 = string.valueof(sbpList[i+24].Sales_Plan__r.BasePrice__c);
                    obj2.varM2Y2 = string.valueof(sbpList[i+25].Sales_Plan__r.BasePrice__c);
                    obj2.varM3Y2 = string.valueof(sbpList[i+26].Sales_Plan__r.BasePrice__c);
                    obj2.varM4Y2 = string.valueof(sbpList[i+27].Sales_Plan__r.BasePrice__c);
                    obj2.varM5Y2 = string.valueof(sbpList[i+28].Sales_Plan__r.BasePrice__c);
                    obj2.varM6Y2 = string.valueof(sbpList[i+29].Sales_Plan__r.BasePrice__c);
                    obj2.varM7Y2 = string.valueof(sbpList[i+30].Sales_Plan__r.BasePrice__c);
                    obj2.varM8Y2 = string.valueof(sbpList[i+31].Sales_Plan__r.BasePrice__c);
                    obj2.varM9Y2 = string.valueof(sbpList[i+32].Sales_Plan__r.BasePrice__c);
                    obj2.varM10Y2 = string.valueof(sbpList[i+33].Sales_Plan__r.BasePrice__c);
                    obj2.varM11Y2 = string.valueof(sbpList[i+34].Sales_Plan__r.BasePrice__c);
                    obj2.varM12Y2 = string.valueof(sbpList[i+35].Sales_Plan__r.BasePrice__c);
                    
                    pricesplit.add(obj2);
                    
                    SBPPSWrapper obj3= new SBPPSWrapper();
                    
                    obj3.varPrice_RC= 'Surcharge';
                    obj3.varType = 'SAP';
                    obj3.varM1Y0 = string.valueof(sbpList[i].Sales_Plan__r.Surcharge__c);
                    obj3.varM2Y0 = string.valueof(sbpList[i+1].Sales_Plan__r.Surcharge__c);
                    obj3.varM3Y0 = string.valueof(sbpList[i+2].Sales_Plan__r.Surcharge__c);
                    obj3.varM4Y0 = string.valueof(sbpList[i+3].Sales_Plan__r.Surcharge__c);
                    obj3.varM5Y0 = string.valueof(sbpList[i+4].Sales_Plan__r.Surcharge__c);
                    obj3.varM6Y0 = string.valueof(sbpList[i+5].Sales_Plan__r.Surcharge__c);
                    obj3.varM7Y0 = string.valueof(sbpList[i+6].Sales_Plan__r.Surcharge__c);
                    obj3.varM8Y0 = string.valueof(sbpList[i+7].Sales_Plan__r.Surcharge__c);
                    obj3.varM9Y0 = string.valueof(sbpList[i+8].Sales_Plan__r.Surcharge__c);
                    obj3.varM10Y0 = string.valueof(sbpList[i+9].Sales_Plan__r.Surcharge__c);
                    obj3.varM11Y0 = string.valueof(sbpList[i+10].Sales_Plan__r.Surcharge__c);
                    obj3.varM12Y0 = string.valueof(sbpList[i+11].Sales_Plan__r.Surcharge__c);
                    obj3.varM1Y1 = string.valueof(sbpList[i+12].Sales_Plan__r.Surcharge__c);
                    obj3.varM2Y1 = string.valueof(sbpList[i+13].Sales_Plan__r.Surcharge__c);
                    obj3.varM3Y1 = string.valueof(sbpList[i+14].Sales_Plan__r.Surcharge__c);
                    obj3.varM4Y1 = string.valueof(sbpList[i+15].Sales_Plan__r.Surcharge__c);
                    obj3.varM5Y1 = string.valueof(sbpList[i+16].Sales_Plan__r.Surcharge__c);
                    obj3.varM6Y1 = string.valueof(sbpList[i+17].Sales_Plan__r.Surcharge__c);
                    obj3.varM7Y1 = string.valueof(sbpList[i+18].Sales_Plan__r.Surcharge__c);
                    obj3.varM8Y1 = string.valueof(sbpList[i+19].Sales_Plan__r.Surcharge__c);
                    obj3.varM9Y1 = string.valueof(sbpList[i+20].Sales_Plan__r.Surcharge__c);
                    obj3.varM10Y1 = string.valueof(sbpList[i+21].Sales_Plan__r.Surcharge__c);
                    obj3.varM11Y1 = string.valueof(sbpList[i+22].Sales_Plan__r.Surcharge__c);
                    obj3.varM12Y1 = string.valueof(sbpList[i+23].Sales_Plan__r.Surcharge__c);
                    obj3.varM1Y2 = string.valueof(sbpList[i+24].Sales_Plan__r.Surcharge__c);
                    obj3.varM2Y2 = string.valueof(sbpList[i+25].Sales_Plan__r.Surcharge__c);
                    obj3.varM3Y2 = string.valueof(sbpList[i+26].Sales_Plan__r.Surcharge__c);
                    obj3.varM4Y2 = string.valueof(sbpList[i+27].Sales_Plan__r.Surcharge__c);
                    obj3.varM5Y2 = string.valueof(sbpList[i+28].Sales_Plan__r.Surcharge__c);
                    obj3.varM6Y2 = string.valueof(sbpList[i+29].Sales_Plan__r.Surcharge__c);
                    obj3.varM7Y2 = string.valueof(sbpList[i+30].Sales_Plan__r.Surcharge__c);
                    obj3.varM8Y2 = string.valueof(sbpList[i+31].Sales_Plan__r.Surcharge__c);
                    obj3.varM9Y2 = string.valueof(sbpList[i+32].Sales_Plan__r.Surcharge__c);
                    obj3.varM10Y2 = string.valueof(sbpList[i+33].Sales_Plan__r.Surcharge__c);
                    obj3.varM11Y2 = string.valueof(sbpList[i+34].Sales_Plan__r.Surcharge__c);
                    obj3.varM12Y2 = string.valueof(sbpList[i+35].Sales_Plan__r.Surcharge__c);
                    
                    pricesplit.add(obj3);
                    
                    SBPPSWrapper obj4= new SBPPSWrapper();
                    
                    obj4.varPrice_RC= 'RD&E amortization';
                    obj4.varType = 'SAP';
                    obj4.varM1Y0 = string.valueof(sbpList[i].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM2Y0 = string.valueof(sbpList[i+1].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM3Y0 = string.valueof(sbpList[i+2].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM4Y0 = string.valueof(sbpList[i+3].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM5Y0 = string.valueof(sbpList[i+4].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM6Y0 = string.valueof(sbpList[i+5].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM7Y0 = string.valueof(sbpList[i+6].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM8Y0 = string.valueof(sbpList[i+7].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM9Y0 = string.valueof(sbpList[i+8].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM10Y0 = string.valueof(sbpList[i+9].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM11Y0 = string.valueof(sbpList[i+10].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM12Y0 = string.valueof(sbpList[i+11].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM1Y1 = string.valueof(sbpList[i+12].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM2Y1 = string.valueof(sbpList[i+13].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM3Y1 = string.valueof(sbpList[i+14].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM4Y1 = string.valueof(sbpList[i+15].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM5Y1 = string.valueof(sbpList[i+16].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM6Y1 = string.valueof(sbpList[i+17].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM7Y1 = string.valueof(sbpList[i+18].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM8Y1 = string.valueof(sbpList[i+19].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM9Y1 = string.valueof(sbpList[i+20].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM10Y1 = string.valueof(sbpList[i+21].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM11Y1 = string.valueof(sbpList[i+22].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM12Y1 = string.valueof(sbpList[i+23].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM1Y2 = string.valueof(sbpList[i+24].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM2Y2 = string.valueof(sbpList[i+25].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM3Y2 = string.valueof(sbpList[i+26].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM4Y2 = string.valueof(sbpList[i+27].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM5Y2 = string.valueof(sbpList[i+28].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM6Y2 = string.valueof(sbpList[i+29].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM7Y2 = string.valueof(sbpList[i+30].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM8Y2 = string.valueof(sbpList[i+31].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM9Y2 = string.valueof(sbpList[i+32].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM10Y2 = string.valueof(sbpList[i+33].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM11Y2 = string.valueof(sbpList[i+34].Sales_Plan__r.RD_E_amortization__c);
                    obj4.varM12Y2 = string.valueof(sbpList[i+35].Sales_Plan__r.RD_E_amortization__c);
                    
                    pricesplit.add(obj4);
                    
                    SBPPSWrapper obj5= new SBPPSWrapper();
                    
                    obj5.varPrice_RC= 'Tooling Amortization';
                    obj5.varType = 'SAP';
                    obj5.varM1Y0 = string.valueof(sbpList[i].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM2Y0 = string.valueof(sbpList[i+1].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM3Y0 = string.valueof(sbpList[i+2].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM4Y0 = string.valueof(sbpList[i+3].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM5Y0 = string.valueof(sbpList[i+4].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM6Y0 = string.valueof(sbpList[i+5].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM7Y0 = string.valueof(sbpList[i+6].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM8Y0 = string.valueof(sbpList[i+7].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM9Y0 = string.valueof(sbpList[i+8].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM10Y0 = string.valueof(sbpList[i+9].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM11Y0 = string.valueof(sbpList[i+10].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM12Y0 = string.valueof(sbpList[i+11].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM1Y1 = string.valueof(sbpList[i+12].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM2Y1 = string.valueof(sbpList[i+13].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM3Y1 = string.valueof(sbpList[i+14].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM4Y1 = string.valueof(sbpList[i+15].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM5Y1 = string.valueof(sbpList[i+16].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM6Y1 = string.valueof(sbpList[i+17].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM7Y1 = string.valueof(sbpList[i+18].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM8Y1 = string.valueof(sbpList[i+19].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM9Y1 = string.valueof(sbpList[i+20].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM10Y1 = string.valueof(sbpList[i+21].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM11Y1 = string.valueof(sbpList[i+22].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM12Y1 = string.valueof(sbpList[i+23].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM1Y2 = string.valueof(sbpList[i+24].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM2Y2 = string.valueof(sbpList[i+25].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM3Y2 = string.valueof(sbpList[i+26].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM4Y2 = string.valueof(sbpList[i+27].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM5Y2 = string.valueof(sbpList[i+28].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM6Y2 = string.valueof(sbpList[i+29].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM7Y2 = string.valueof(sbpList[i+30].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM8Y2 = string.valueof(sbpList[i+31].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM9Y2 = string.valueof(sbpList[i+32].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM10Y2 = string.valueof(sbpList[i+33].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM11Y2 = string.valueof(sbpList[i+34].Sales_Plan__r.Tooling_Amortization__c);
                    obj5.varM12Y2 = string.valueof(sbpList[i+35].Sales_Plan__r.Tooling_Amortization__c);
                    
                    pricesplit.add(obj5);
                    
                    SBPPSWrapper obj6= new SBPPSWrapper();
                    
                    obj6.varPrice_RC= 'Current Interest';
                    obj6.varType = 'SAP';
                    obj6.varM1Y0 = string.valueof(sbpList[i].Sales_Plan__r.Current_Interest__c);
                    obj6.varM2Y0 = string.valueof(sbpList[i+1].Sales_Plan__r.Current_Interest__c);
                    obj6.varM3Y0 = string.valueof(sbpList[i+2].Sales_Plan__r.Current_Interest__c);
                    obj6.varM4Y0 = string.valueof(sbpList[i+3].Sales_Plan__r.Current_Interest__c);
                    obj6.varM5Y0 = string.valueof(sbpList[i+4].Sales_Plan__r.Current_Interest__c);
                    obj6.varM6Y0 = string.valueof(sbpList[i+5].Sales_Plan__r.Current_Interest__c);
                    obj6.varM7Y0 = string.valueof(sbpList[i+6].Sales_Plan__r.Current_Interest__c);
                    obj6.varM8Y0 = string.valueof(sbpList[i+7].Sales_Plan__r.Current_Interest__c);
                    obj6.varM9Y0 = string.valueof(sbpList[i+8].Sales_Plan__r.Current_Interest__c);
                    obj6.varM10Y0 = string.valueof(sbpList[i+9].Sales_Plan__r.Current_Interest__c);
                    obj6.varM11Y0 = string.valueof(sbpList[i+10].Sales_Plan__r.Current_Interest__c);
                    obj6.varM12Y0 = string.valueof(sbpList[i+11].Sales_Plan__r.Current_Interest__c);
                    obj6.varM1Y1 = string.valueof(sbpList[i+12].Sales_Plan__r.Current_Interest__c);
                    obj6.varM2Y1 = string.valueof(sbpList[i+13].Sales_Plan__r.Current_Interest__c);
                    obj6.varM3Y1 = string.valueof(sbpList[i+14].Sales_Plan__r.Current_Interest__c);
                    obj6.varM4Y1 = string.valueof(sbpList[i+15].Sales_Plan__r.Current_Interest__c);
                    obj6.varM5Y1 = string.valueof(sbpList[i+16].Sales_Plan__r.Current_Interest__c);
                    obj6.varM6Y1 = string.valueof(sbpList[i+17].Sales_Plan__r.Current_Interest__c);
                    obj6.varM7Y1 = string.valueof(sbpList[i+18].Sales_Plan__r.Current_Interest__c);
                    obj6.varM8Y1 = string.valueof(sbpList[i+19].Sales_Plan__r.Current_Interest__c);
                    obj6.varM9Y1 = string.valueof(sbpList[i+20].Sales_Plan__r.Current_Interest__c);
                    obj6.varM10Y1 = string.valueof(sbpList[i+21].Sales_Plan__r.Current_Interest__c);
                    obj6.varM11Y1 = string.valueof(sbpList[i+22].Sales_Plan__r.Current_Interest__c);
                    obj6.varM12Y1 = string.valueof(sbpList[i+23].Sales_Plan__r.Current_Interest__c);
                    obj6.varM1Y2 = string.valueof(sbpList[i+24].Sales_Plan__r.Current_Interest__c);
                    obj6.varM2Y2 = string.valueof(sbpList[i+25].Sales_Plan__r.Current_Interest__c);
                    obj6.varM3Y2 = string.valueof(sbpList[i+26].Sales_Plan__r.Current_Interest__c);
                    obj6.varM4Y2 = string.valueof(sbpList[i+27].Sales_Plan__r.Current_Interest__c);
                    obj6.varM5Y2 = string.valueof(sbpList[i+28].Sales_Plan__r.Current_Interest__c);
                    obj6.varM6Y2 = string.valueof(sbpList[i+29].Sales_Plan__r.Current_Interest__c);
                    obj6.varM7Y2 = string.valueof(sbpList[i+30].Sales_Plan__r.Current_Interest__c);
                    obj6.varM8Y2 = string.valueof(sbpList[i+31].Sales_Plan__r.Current_Interest__c);
                    obj6.varM9Y2 = string.valueof(sbpList[i+32].Sales_Plan__r.Current_Interest__c);
                    obj6.varM10Y2 = string.valueof(sbpList[i+33].Sales_Plan__r.Current_Interest__c);
                    obj6.varM11Y2 = string.valueof(sbpList[i+34].Sales_Plan__r.Current_Interest__c);
                    obj6.varM12Y2 = string.valueof(sbpList[i+35].Sales_Plan__r.Current_Interest__c);
                    
                    pricesplit.add(obj6);
                    
                    SBPPSWrapper obj6b= new SBPPSWrapper();
                    
                    obj6b.varPrice_RC= 'Logistic/Packaging';
                    obj6b.varType = 'SAP';
                    obj6b.varM1Y0 = string.valueof(sbpList[i].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM2Y0 = string.valueof(sbpList[i+1].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM3Y0 = string.valueof(sbpList[i+2].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM4Y0 = string.valueof(sbpList[i+3].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM5Y0 = string.valueof(sbpList[i+4].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM6Y0 = string.valueof(sbpList[i+5].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM7Y0 = string.valueof(sbpList[i+6].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM8Y0 = string.valueof(sbpList[i+7].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM9Y0 = string.valueof(sbpList[i+8].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM10Y0 = string.valueof(sbpList[i+9].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM11Y0 = string.valueof(sbpList[i+10].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM12Y0 = string.valueof(sbpList[i+11].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM1Y1 = string.valueof(sbpList[i+12].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM2Y1 = string.valueof(sbpList[i+13].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM3Y1 = string.valueof(sbpList[i+14].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM4Y1 = string.valueof(sbpList[i+15].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM5Y1 = string.valueof(sbpList[i+16].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM6Y1 = string.valueof(sbpList[i+17].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM7Y1 = string.valueof(sbpList[i+18].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM8Y1 = string.valueof(sbpList[i+19].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM9Y1 = string.valueof(sbpList[i+20].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM10Y1 = string.valueof(sbpList[i+21].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM11Y1 = string.valueof(sbpList[i+22].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM12Y1 = string.valueof(sbpList[i+23].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM1Y2 = string.valueof(sbpList[i+24].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM2Y2 = string.valueof(sbpList[i+25].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM3Y2 = string.valueof(sbpList[i+26].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM4Y2 = string.valueof(sbpList[i+27].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM5Y2 = string.valueof(sbpList[i+28].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM6Y2 = string.valueof(sbpList[i+29].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM7Y2 = string.valueof(sbpList[i+30].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM8Y2 = string.valueof(sbpList[i+31].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM9Y2 = string.valueof(sbpList[i+32].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM10Y2 = string.valueof(sbpList[i+33].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM11Y2 = string.valueof(sbpList[i+34].Sales_Plan__r.Logistic_Packaging__c);
                    obj6b.varM12Y2 = string.valueof(sbpList[i+35].Sales_Plan__r.Logistic_Packaging__c);
                    
                    pricesplit.add(obj6b);
                    
                    SBPPSWrapper obj7= new SBPPSWrapper();
                    
                    obj7.varPrice_RC = 'Forecast Price';
                    obj7.varType = 'SBP';
                    obj7.varM1Y0 = sbpList[i].CurrencyIsoCode + ' ' + string.valueof((sbpList[i].LC_Price_calcd__c).setScale(4));
                    obj7.varM2Y0 = sbpList[i+1].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+1].LC_Price_calcd__c).setScale(4));
                    obj7.varM3Y0 = sbpList[i+2].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+2].LC_Price_calcd__c).setScale(4));
                    obj7.varM4Y0 = sbpList[i+3].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+3].LC_Price_calcd__c).setScale(4));
                    obj7.varM5Y0 = sbpList[i+4].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+4].LC_Price_calcd__c).setScale(4));
                    obj7.varM6Y0 = sbpList[i+5].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+5].LC_Price_calcd__c).setScale(4));
                    obj7.varM7Y0 = sbpList[i+6].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+6].LC_Price_calcd__c).setScale(4));
                    obj7.varM8Y0 = sbpList[i+7].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+7].LC_Price_calcd__c).setScale(4));
                    obj7.varM9Y0 = sbpList[i+8].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+8].LC_Price_calcd__c).setScale(4));
                    obj7.varM10Y0 = sbpList[i+9].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+9].LC_Price_calcd__c).setScale(4));
                    obj7.varM11Y0 = sbpList[i+10].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+10].LC_Price_calcd__c).setScale(4));
                    obj7.varM12Y0 = sbpList[i+11].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+11].LC_Price_calcd__c).setScale(4));
                    obj7.varM1Y1 = sbpList[i+12].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+12].LC_Price_calcd__c).setScale(4));
                    obj7.varM2Y1 = sbpList[i+13].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+13].LC_Price_calcd__c).setScale(4));
                    obj7.varM3Y1 = sbpList[i+14].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+14].LC_Price_calcd__c).setScale(4));
                    obj7.varM4Y1 = sbpList[i+15].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+15].LC_Price_calcd__c).setScale(4));
                    obj7.varM5Y1 = sbpList[i+16].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+16].LC_Price_calcd__c).setScale(4));
                    obj7.varM6Y1 = sbpList[i+17].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+17].LC_Price_calcd__c).setScale(4));
                    obj7.varM7Y1 = sbpList[i+18].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+18].LC_Price_calcd__c).setScale(4));
                    obj7.varM8Y1 = sbpList[i+19].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+19].LC_Price_calcd__c).setScale(4));
                    obj7.varM9Y1 = sbpList[i+20].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+20].LC_Price_calcd__c).setScale(4));
                    obj7.varM10Y1 = sbpList[i+21].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+21].LC_Price_calcd__c).setScale(4));
                    obj7.varM11Y1 = sbpList[i+22].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+22].LC_Price_calcd__c).setScale(4));
                    obj7.varM12Y1 = sbpList[i+23].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+23].LC_Price_calcd__c).setScale(4));
                    obj7.varM1Y2 = sbpList[i+24].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+24].LC_Price_calcd__c).setScale(4));
                    obj7.varM2Y2 = sbpList[i+25].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+25].LC_Price_calcd__c).setScale(4));
                    obj7.varM3Y2 = sbpList[i+26].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+26].LC_Price_calcd__c).setScale(4));
                    obj7.varM4Y2 = sbpList[i+27].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+27].LC_Price_calcd__c).setScale(4));
                    obj7.varM5Y2 = sbpList[i+28].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+28].LC_Price_calcd__c).setScale(4));
                    obj7.varM6Y2 = sbpList[i+29].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+29].LC_Price_calcd__c).setScale(4));
                    obj7.varM7Y2 = sbpList[i+30].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+30].LC_Price_calcd__c).setScale(4));
                    obj7.varM8Y2 = sbpList[i+31].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+31].LC_Price_calcd__c).setScale(4));
                    obj7.varM9Y2 = sbpList[i+32].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+32].LC_Price_calcd__c).setScale(4));
                    obj7.varM10Y2 = sbpList[i+33].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+33].LC_Price_calcd__c).setScale(4));
                    obj7.varM11Y2 = sbpList[i+34].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+34].LC_Price_calcd__c).setScale(4));
                    obj7.varM12Y2 = sbpList[i+35].CurrencyIsoCode + ' ' + string.valueof((sbpList[i+35].LC_Price_calcd__c).setScale(4));
                    
                    pricesplit.add(obj7);
                    
                    SBPPSWrapper obj8= new SBPPSWrapper();
                    
                    obj8.varPrice_RC= 'Base Price';
                    obj8.varType = 'SBP';
                    obj8.varM1Y0 = string.valueof(sbpList[i].BasePrice_Calc__c);
                    obj8.varM2Y0 = string.valueof(sbpList[i+1].BasePrice_Calc__c);
                    obj8.varM3Y0 = string.valueof(sbpList[i+2].BasePrice_Calc__c);
                    obj8.varM4Y0 = string.valueof(sbpList[i+3].BasePrice_Calc__c);
                    obj8.varM5Y0 = string.valueof(sbpList[i+4].BasePrice_Calc__c);
                    obj8.varM6Y0 = string.valueof(sbpList[i+5].BasePrice_Calc__c);
                    obj8.varM7Y0 = string.valueof(sbpList[i+6].BasePrice_Calc__c);
                    obj8.varM8Y0 = string.valueof(sbpList[i+7].BasePrice_Calc__c);
                    obj8.varM9Y0 = string.valueof(sbpList[i+8].BasePrice_Calc__c);
                    obj8.varM10Y0 = string.valueof(sbpList[i+9].BasePrice_Calc__c);
                    obj8.varM11Y0 = string.valueof(sbpList[i+10].BasePrice_Calc__c);
                    obj8.varM12Y0 = string.valueof(sbpList[i+11].BasePrice_Calc__c);
                    obj8.varM1Y1 = string.valueof(sbpList[i+12].BasePrice_Calc__c);
                    obj8.varM2Y1 = string.valueof(sbpList[i+13].BasePrice_Calc__c);
                    obj8.varM3Y1 = string.valueof(sbpList[i+14].BasePrice_Calc__c);
                    obj8.varM4Y1 = string.valueof(sbpList[i+15].BasePrice_Calc__c);
                    obj8.varM5Y1 = string.valueof(sbpList[i+16].BasePrice_Calc__c);
                    obj8.varM6Y1 = string.valueof(sbpList[i+17].BasePrice_Calc__c);
                    obj8.varM7Y1 = string.valueof(sbpList[i+18].BasePrice_Calc__c);
                    obj8.varM8Y1 = string.valueof(sbpList[i+19].BasePrice_Calc__c);
                    obj8.varM9Y1 = string.valueof(sbpList[i+20].BasePrice_Calc__c);
                    obj8.varM10Y1 = string.valueof(sbpList[i+21].BasePrice_Calc__c);
                    obj8.varM11Y1 = string.valueof(sbpList[i+22].BasePrice_Calc__c);
                    obj8.varM12Y1 = string.valueof(sbpList[i+23].BasePrice_Calc__c);
                    obj8.varM1Y2 = string.valueof(sbpList[i+24].BasePrice_Calc__c);
                    obj8.varM2Y2 = string.valueof(sbpList[i+25].BasePrice_Calc__c);
                    obj8.varM3Y2 = string.valueof(sbpList[i+26].BasePrice_Calc__c);
                    obj8.varM4Y2 = string.valueof(sbpList[i+27].BasePrice_Calc__c);
                    obj8.varM5Y2 = string.valueof(sbpList[i+28].BasePrice_Calc__c);
                    obj8.varM6Y2 = string.valueof(sbpList[i+29].BasePrice_Calc__c);
                    obj8.varM7Y2 = string.valueof(sbpList[i+30].BasePrice_Calc__c);
                    obj8.varM8Y2 = string.valueof(sbpList[i+31].BasePrice_Calc__c);
                    obj8.varM9Y2 = string.valueof(sbpList[i+32].BasePrice_Calc__c);
                    obj8.varM10Y2 = string.valueof(sbpList[i+33].BasePrice_Calc__c);
                    obj8.varM11Y2 = string.valueof(sbpList[i+34].BasePrice_Calc__c);
                    obj8.varM12Y2 = string.valueof(sbpList[i+35].BasePrice_Calc__c);
                    
                    pricesplit.add(obj8);
                    
                    SBPPSWrapper obj9= new SBPPSWrapper();
                    
                    obj9.varPrice_RC= 'Surcharge';
                    obj9.varType = 'SBP';
                    obj9.varM1Y0 = string.valueof(sbpList[i].Surcharge_Calc__c);
                    obj9.varM2Y0 = string.valueof(sbpList[i+1].Surcharge_Calc__c);
                    obj9.varM3Y0 = string.valueof(sbpList[i+2].Surcharge_Calc__c);
                    obj9.varM4Y0 = string.valueof(sbpList[i+3].Surcharge_Calc__c);
                    obj9.varM5Y0 = string.valueof(sbpList[i+4].Surcharge_Calc__c);
                    obj9.varM6Y0 = string.valueof(sbpList[i+5].Surcharge_Calc__c);
                    obj9.varM7Y0 = string.valueof(sbpList[i+6].Surcharge_Calc__c);
                    obj9.varM8Y0 = string.valueof(sbpList[i+7].Surcharge_Calc__c);
                    obj9.varM9Y0 = string.valueof(sbpList[i+8].Surcharge_Calc__c);
                    obj9.varM10Y0 = string.valueof(sbpList[i+9].Surcharge_Calc__c);
                    obj9.varM11Y0 = string.valueof(sbpList[i+10].Surcharge_Calc__c);
                    obj9.varM12Y0 = string.valueof(sbpList[i+11].Surcharge_Calc__c);
                    obj9.varM1Y1 = string.valueof(sbpList[i+12].Surcharge_Calc__c);
                    obj9.varM2Y1 = string.valueof(sbpList[i+13].Surcharge_Calc__c);
                    obj9.varM3Y1 = string.valueof(sbpList[i+14].Surcharge_Calc__c);
                    obj9.varM4Y1 = string.valueof(sbpList[i+15].Surcharge_Calc__c);
                    obj9.varM5Y1 = string.valueof(sbpList[i+16].Surcharge_Calc__c);
                    obj9.varM6Y1 = string.valueof(sbpList[i+17].Surcharge_Calc__c);
                    obj9.varM7Y1 = string.valueof(sbpList[i+18].Surcharge_Calc__c);
                    obj9.varM8Y1 = string.valueof(sbpList[i+19].Surcharge_Calc__c);
                    obj9.varM9Y1 = string.valueof(sbpList[i+20].Surcharge_Calc__c);
                    obj9.varM10Y1 = string.valueof(sbpList[i+21].Surcharge_Calc__c);
                    obj9.varM11Y1 = string.valueof(sbpList[i+22].Surcharge_Calc__c);
                    obj9.varM12Y1 = string.valueof(sbpList[i+23].Surcharge_Calc__c);
                    obj9.varM1Y2 = string.valueof(sbpList[i+24].Surcharge_Calc__c);
                    obj9.varM2Y2 = string.valueof(sbpList[i+25].Surcharge_Calc__c);
                    obj9.varM3Y2 = string.valueof(sbpList[i+26].Surcharge_Calc__c);
                    obj9.varM4Y2 = string.valueof(sbpList[i+27].Surcharge_Calc__c);
                    obj9.varM5Y2 = string.valueof(sbpList[i+28].Surcharge_Calc__c);
                    obj9.varM6Y2 = string.valueof(sbpList[i+29].Surcharge_Calc__c);
                    obj9.varM7Y2 = string.valueof(sbpList[i+30].Surcharge_Calc__c);
                    obj9.varM8Y2 = string.valueof(sbpList[i+31].Surcharge_Calc__c);
                    obj9.varM9Y2 = string.valueof(sbpList[i+32].Surcharge_Calc__c);
                    obj9.varM10Y2 = string.valueof(sbpList[i+33].Surcharge_Calc__c);
                    obj9.varM11Y2 = string.valueof(sbpList[i+34].Surcharge_Calc__c);
                    obj9.varM12Y2 = string.valueof(sbpList[i+35].Surcharge_Calc__c);
                    
                    pricesplit.add(obj9);
                    
                    SBPPSWrapper obj10= new SBPPSWrapper();
                    
                    obj10.varPrice_RC= 'RD&E amortization';
                    obj10.varType = 'SBP';
                    obj10.varM1Y0 = string.valueof(sbpList[i].RD_E_amortization_Calc__c);
                    obj10.varM2Y0 = string.valueof(sbpList[i+1].RD_E_amortization_Calc__c);
                    obj10.varM3Y0 = string.valueof(sbpList[i+2].RD_E_amortization_Calc__c);
                    obj10.varM4Y0 = string.valueof(sbpList[i+3].RD_E_amortization_Calc__c);
                    obj10.varM5Y0 = string.valueof(sbpList[i+4].RD_E_amortization_Calc__c);
                    obj10.varM6Y0 = string.valueof(sbpList[i+5].RD_E_amortization_Calc__c);
                    obj10.varM7Y0 = string.valueof(sbpList[i+6].RD_E_amortization_Calc__c);
                    obj10.varM8Y0 = string.valueof(sbpList[i+7].RD_E_amortization_Calc__c);
                    obj10.varM9Y0 = string.valueof(sbpList[i+8].RD_E_amortization_Calc__c);
                    obj10.varM10Y0 = string.valueof(sbpList[i+9].RD_E_amortization_Calc__c);
                    obj10.varM11Y0 = string.valueof(sbpList[i+10].RD_E_amortization_Calc__c);
                    obj10.varM12Y0 = string.valueof(sbpList[i+11].RD_E_amortization_Calc__c);
                    obj10.varM1Y1 = string.valueof(sbpList[i+12].RD_E_amortization_Calc__c);
                    obj10.varM2Y1 = string.valueof(sbpList[i+13].RD_E_amortization_Calc__c);
                    obj10.varM3Y1 = string.valueof(sbpList[i+14].RD_E_amortization_Calc__c);
                    obj10.varM4Y1 = string.valueof(sbpList[i+15].RD_E_amortization_Calc__c);
                    obj10.varM5Y1 = string.valueof(sbpList[i+16].RD_E_amortization_Calc__c);
                    obj10.varM6Y1 = string.valueof(sbpList[i+17].RD_E_amortization_Calc__c);
                    obj10.varM7Y1 = string.valueof(sbpList[i+18].RD_E_amortization_Calc__c);
                    obj10.varM8Y1 = string.valueof(sbpList[i+19].RD_E_amortization_Calc__c);
                    obj10.varM9Y1 = string.valueof(sbpList[i+20].RD_E_amortization_Calc__c);
                    obj10.varM10Y1 = string.valueof(sbpList[i+21].RD_E_amortization_Calc__c);
                    obj10.varM11Y1 = string.valueof(sbpList[i+22].RD_E_amortization_Calc__c);
                    obj10.varM12Y1 = string.valueof(sbpList[i+23].RD_E_amortization_Calc__c);
                    obj10.varM1Y2 = string.valueof(sbpList[i+24].RD_E_amortization_Calc__c);
                    obj10.varM2Y2 = string.valueof(sbpList[i+25].RD_E_amortization_Calc__c);
                    obj10.varM3Y2 = string.valueof(sbpList[i+26].RD_E_amortization_Calc__c);
                    obj10.varM4Y2 = string.valueof(sbpList[i+27].RD_E_amortization_Calc__c);
                    obj10.varM5Y2 = string.valueof(sbpList[i+28].RD_E_amortization_Calc__c);
                    obj10.varM6Y2 = string.valueof(sbpList[i+29].RD_E_amortization_Calc__c);
                    obj10.varM7Y2 = string.valueof(sbpList[i+30].RD_E_amortization_Calc__c);
                    obj10.varM8Y2 = string.valueof(sbpList[i+31].RD_E_amortization_Calc__c);
                    obj10.varM9Y2 = string.valueof(sbpList[i+32].RD_E_amortization_Calc__c);
                    obj10.varM10Y2 = string.valueof(sbpList[i+33].RD_E_amortization_Calc__c);
                    obj10.varM11Y2 = string.valueof(sbpList[i+34].RD_E_amortization_Calc__c);
                    obj10.varM12Y2 = string.valueof(sbpList[i+35].RD_E_amortization_Calc__c);
                    
                    pricesplit.add(obj10);
                    
                    SBPPSWrapper obj11= new SBPPSWrapper();
                    
                    obj11.varPrice_RC= 'Tooling Amortization';
                    obj11.varType = 'SBP';
                    obj11.varM1Y0 = string.valueof(sbpList[i].Tooling_Amortization_Calc__c);
                    obj11.varM2Y0 = string.valueof(sbpList[i+1].Tooling_Amortization_Calc__c);
                    obj11.varM3Y0 = string.valueof(sbpList[i+2].Tooling_Amortization_Calc__c);
                    obj11.varM4Y0 = string.valueof(sbpList[i+3].Tooling_Amortization_Calc__c);
                    obj11.varM5Y0 = string.valueof(sbpList[i+4].Tooling_Amortization_Calc__c);
                    obj11.varM6Y0 = string.valueof(sbpList[i+5].Tooling_Amortization_Calc__c);
                    obj11.varM7Y0 = string.valueof(sbpList[i+6].Tooling_Amortization_Calc__c);
                    obj11.varM8Y0 = string.valueof(sbpList[i+7].Tooling_Amortization_Calc__c);
                    obj11.varM9Y0 = string.valueof(sbpList[i+8].Tooling_Amortization_Calc__c);
                    obj11.varM10Y0 = string.valueof(sbpList[i+9].Tooling_Amortization_Calc__c);
                    obj11.varM11Y0 = string.valueof(sbpList[i+10].Tooling_Amortization_Calc__c);
                    obj11.varM12Y0 = string.valueof(sbpList[i+11].Tooling_Amortization_Calc__c);
                    obj11.varM1Y1 = string.valueof(sbpList[i+12].Tooling_Amortization_Calc__c);
                    obj11.varM2Y1 = string.valueof(sbpList[i+13].Tooling_Amortization_Calc__c);
                    obj11.varM3Y1 = string.valueof(sbpList[i+14].Tooling_Amortization_Calc__c);
                    obj11.varM4Y1 = string.valueof(sbpList[i+15].Tooling_Amortization_Calc__c);
                    obj11.varM5Y1 = string.valueof(sbpList[i+16].Tooling_Amortization_Calc__c);
                    obj11.varM6Y1 = string.valueof(sbpList[i+17].Tooling_Amortization_Calc__c);
                    obj11.varM7Y1 = string.valueof(sbpList[i+18].Tooling_Amortization_Calc__c);
                    obj11.varM8Y1 = string.valueof(sbpList[i+19].Tooling_Amortization_Calc__c);
                    obj11.varM9Y1 = string.valueof(sbpList[i+20].Tooling_Amortization_Calc__c);
                    obj11.varM10Y1 = string.valueof(sbpList[i+21].Tooling_Amortization_Calc__c);
                    obj11.varM11Y1 = string.valueof(sbpList[i+22].Tooling_Amortization_Calc__c);
                    obj11.varM12Y1 = string.valueof(sbpList[i+23].Tooling_Amortization_Calc__c);
                    obj11.varM1Y2 = string.valueof(sbpList[i+24].Tooling_Amortization_Calc__c);
                    obj11.varM2Y2 = string.valueof(sbpList[i+25].Tooling_Amortization_Calc__c);
                    obj11.varM3Y2 = string.valueof(sbpList[i+26].Tooling_Amortization_Calc__c);
                    obj11.varM4Y2 = string.valueof(sbpList[i+27].Tooling_Amortization_Calc__c);
                    obj11.varM5Y2 = string.valueof(sbpList[i+28].Tooling_Amortization_Calc__c);
                    obj11.varM6Y2 = string.valueof(sbpList[i+29].Tooling_Amortization_Calc__c);
                    obj11.varM7Y2 = string.valueof(sbpList[i+30].Tooling_Amortization_Calc__c);
                    obj11.varM8Y2 = string.valueof(sbpList[i+31].Tooling_Amortization_Calc__c);
                    obj11.varM9Y2 = string.valueof(sbpList[i+32].Tooling_Amortization_Calc__c);
                    obj11.varM10Y2 = string.valueof(sbpList[i+33].Tooling_Amortization_Calc__c);
                    obj11.varM11Y2 = string.valueof(sbpList[i+34].Tooling_Amortization_Calc__c);
                    obj11.varM12Y2 = string.valueof(sbpList[i+35].Tooling_Amortization_Calc__c);
                    
                    pricesplit.add(obj11);
                    
                    SBPPSWrapper obj12= new SBPPSWrapper();
                    
                    obj12.varPrice_RC= 'Current Interest';
                    obj12.varType = 'SBP';
                    obj12.varM1Y0 = string.valueof(sbpList[i].Current_Interest_Calc__c);
                    obj12.varM2Y0 = string.valueof(sbpList[i+1].Current_Interest_Calc__c);
                    obj12.varM3Y0 = string.valueof(sbpList[i+2].Current_Interest_Calc__c);
                    obj12.varM4Y0 = string.valueof(sbpList[i+3].Current_Interest_Calc__c);
                    obj12.varM5Y0 = string.valueof(sbpList[i+4].Current_Interest_Calc__c);
                    obj12.varM6Y0 = string.valueof(sbpList[i+5].Current_Interest_Calc__c);
                    obj12.varM7Y0 = string.valueof(sbpList[i+6].Current_Interest_Calc__c);
                    obj12.varM8Y0 = string.valueof(sbpList[i+7].Current_Interest_Calc__c);
                    obj12.varM9Y0 = string.valueof(sbpList[i+8].Current_Interest_Calc__c);
                    obj12.varM10Y0 = string.valueof(sbpList[i+9].Current_Interest_Calc__c);
                    obj12.varM11Y0 = string.valueof(sbpList[i+10].Current_Interest_Calc__c);
                    obj12.varM12Y0 = string.valueof(sbpList[i+11].Current_Interest_Calc__c);
                    obj12.varM1Y1 = string.valueof(sbpList[i+12].Current_Interest_Calc__c);
                    obj12.varM2Y1 = string.valueof(sbpList[i+13].Current_Interest_Calc__c);
                    obj12.varM3Y1 = string.valueof(sbpList[i+14].Current_Interest_Calc__c);
                    obj12.varM4Y1 = string.valueof(sbpList[i+15].Current_Interest_Calc__c);
                    obj12.varM5Y1 = string.valueof(sbpList[i+16].Current_Interest_Calc__c);
                    obj12.varM6Y1 = string.valueof(sbpList[i+17].Current_Interest_Calc__c);
                    obj12.varM7Y1 = string.valueof(sbpList[i+18].Current_Interest_Calc__c);
                    obj12.varM8Y1 = string.valueof(sbpList[i+19].Current_Interest_Calc__c);
                    obj12.varM9Y1 = string.valueof(sbpList[i+20].Current_Interest_Calc__c);
                    obj12.varM10Y1 = string.valueof(sbpList[i+21].Current_Interest_Calc__c);
                    obj12.varM11Y1 = string.valueof(sbpList[i+22].Current_Interest_Calc__c);
                    obj12.varM12Y1 = string.valueof(sbpList[i+23].Current_Interest_Calc__c);
                    obj12.varM1Y2 = string.valueof(sbpList[i+24].Current_Interest_Calc__c);
                    obj12.varM2Y2 = string.valueof(sbpList[i+25].Current_Interest_Calc__c);
                    obj12.varM3Y2 = string.valueof(sbpList[i+26].Current_Interest_Calc__c);
                    obj12.varM4Y2 = string.valueof(sbpList[i+27].Current_Interest_Calc__c);
                    obj12.varM5Y2 = string.valueof(sbpList[i+28].Current_Interest_Calc__c);
                    obj12.varM6Y2 = string.valueof(sbpList[i+29].Current_Interest_Calc__c);
                    obj12.varM7Y2 = string.valueof(sbpList[i+30].Current_Interest_Calc__c);
                    obj12.varM8Y2 = string.valueof(sbpList[i+31].Current_Interest_Calc__c);
                    obj12.varM9Y2 = string.valueof(sbpList[i+32].Current_Interest_Calc__c);
                    obj12.varM10Y2 = string.valueof(sbpList[i+33].Current_Interest_Calc__c);
                    obj12.varM11Y2 = string.valueof(sbpList[i+34].Current_Interest_Calc__c);
                    obj12.varM12Y2 = string.valueof(sbpList[i+35].Current_Interest_Calc__c);
                    
                    pricesplit.add(obj12);
                    
                    SBPPSWrapper obj13= new SBPPSWrapper();
                    
                    obj13.varPrice_RC= 'Logistic/Packaging';
                    obj13.varType = 'SBP';
                    obj13.varM1Y0 = string.valueof(sbpList[i].Logistic_Packaging_Calc__c);
                    obj13.varM2Y0 = string.valueof(sbpList[i+1].Logistic_Packaging_Calc__c);
                    obj13.varM3Y0 = string.valueof(sbpList[i+2].Logistic_Packaging_Calc__c);
                    obj13.varM4Y0 = string.valueof(sbpList[i+3].Logistic_Packaging_Calc__c);
                    obj13.varM5Y0 = string.valueof(sbpList[i+4].Logistic_Packaging_Calc__c);
                    obj13.varM6Y0 = string.valueof(sbpList[i+5].Logistic_Packaging_Calc__c);
                    obj13.varM7Y0 = string.valueof(sbpList[i+6].Logistic_Packaging_Calc__c);
                    obj13.varM8Y0 = string.valueof(sbpList[i+7].Logistic_Packaging_Calc__c);
                    obj13.varM9Y0 = string.valueof(sbpList[i+8].Logistic_Packaging_Calc__c);
                    obj13.varM10Y0 = string.valueof(sbpList[i+9].Logistic_Packaging_Calc__c);
                    obj13.varM11Y0 = string.valueof(sbpList[i+10].Logistic_Packaging_Calc__c);
                    obj13.varM12Y0 = string.valueof(sbpList[i+11].Logistic_Packaging_Calc__c);
                    obj13.varM1Y1 = string.valueof(sbpList[i+12].Logistic_Packaging_Calc__c);
                    obj13.varM2Y1 = string.valueof(sbpList[i+13].Logistic_Packaging_Calc__c);
                    obj13.varM3Y1 = string.valueof(sbpList[i+14].Logistic_Packaging_Calc__c);
                    obj13.varM4Y1 = string.valueof(sbpList[i+15].Logistic_Packaging_Calc__c);
                    obj13.varM5Y1 = string.valueof(sbpList[i+16].Logistic_Packaging_Calc__c);
                    obj13.varM6Y1 = string.valueof(sbpList[i+17].Logistic_Packaging_Calc__c);
                    obj13.varM7Y1 = string.valueof(sbpList[i+18].Logistic_Packaging_Calc__c);
                    obj13.varM8Y1 = string.valueof(sbpList[i+19].Logistic_Packaging_Calc__c);
                    obj13.varM9Y1 = string.valueof(sbpList[i+20].Logistic_Packaging_Calc__c);
                    obj13.varM10Y1 = string.valueof(sbpList[i+21].Logistic_Packaging_Calc__c);
                    obj13.varM11Y1 = string.valueof(sbpList[i+22].Logistic_Packaging_Calc__c);
                    obj13.varM12Y1 = string.valueof(sbpList[i+23].Logistic_Packaging_Calc__c);
                    obj13.varM1Y2 = string.valueof(sbpList[i+24].Logistic_Packaging_Calc__c);
                    obj13.varM2Y2 = string.valueof(sbpList[i+25].Logistic_Packaging_Calc__c);
                    obj13.varM3Y2 = string.valueof(sbpList[i+26].Logistic_Packaging_Calc__c);
                    obj13.varM4Y2 = string.valueof(sbpList[i+27].Logistic_Packaging_Calc__c);
                    obj13.varM5Y2 = string.valueof(sbpList[i+28].Logistic_Packaging_Calc__c);
                    obj13.varM6Y2 = string.valueof(sbpList[i+29].Logistic_Packaging_Calc__c);
                    obj13.varM7Y2 = string.valueof(sbpList[i+30].Logistic_Packaging_Calc__c);
                    obj13.varM8Y2 = string.valueof(sbpList[i+31].Logistic_Packaging_Calc__c);
                    obj13.varM9Y2 = string.valueof(sbpList[i+32].Logistic_Packaging_Calc__c);
                    obj13.varM10Y2 = string.valueof(sbpList[i+33].Logistic_Packaging_Calc__c);
                    obj13.varM11Y2 = string.valueof(sbpList[i+34].Logistic_Packaging_Calc__c);
                    obj13.varM12Y2 = string.valueof(sbpList[i+35].Logistic_Packaging_Calc__c);
                    
                    pricesplit.add(obj13);
                    
                //system.debug ('pricesplit ' + pricesplit);
                 
                }
            
            
            
            }
            else {
            
                message2 = 'Id Not Found, please try again your search';
            }
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }
        
        return pricesplit;
            
    
    }
    
    public void execute_CalcImpS(Id spId){
    
        if(spId != null){
                
                Id BrandId=[select Brand__c from OEM_Sales_Plan_Ext_Data__c where id=:spid].Brand__c;
                
                String account_name=[select Name from Account where id=:BrandId].Name;
                
                String current_year = string.valueOf(Date.today().year());   
                
                system.debug('execute_CalcImpS');               
                
                Integer offsetval=0;
                
                Boolean ExitWhile=false;
                
                While(ExitWhile==false) {
                    
                    List<Id> sp_list_id = new List<Id>();                    
                    
                    List<OEM_Sales_Plan_Ext_Data__c> sp_list_brand=[select id,CurrencyIsoCode from OEM_Sales_Plan_Ext_Data__c where Brand__c=:BrandId and isClose__c=false limit 50 offset :offsetval];
                    
                    system.debug('sp_list_brand.size() ' + sp_list_brand.size());
                    
                    if(sp_list_brand.size()>0){
                    
                        for(OEM_Sales_Plan_Ext_Data__c spl: sp_list_brand){
                        
                             sp_list_id.add(spl.Id);
                        }
                        
                        future_CalcImpactSimulation(sp_list_id, current_year);
                        
                        offsetval = offsetval + 50;
                    }
                    
                    else {
                        ExitWhile=true;
                    }                    
                }                
         }    
    }
    
    
    @future
    public static void future_CalcImpactSimulation (List<Id> spIdList, String year){
    
        for(Id spl: spIdList){                    
                    CalcImpactSimulation(spl, year);                
        }
    }
    
    
    public void page_CalcImpS(){
                
        if(sp_Id != null){            
                BrandId=[select Brand__c from OEM_Sales_Plan_Ext_Data__c where id=:sp_id].Brand__c;
                
                system.debug('BrandId ' + BrandId);
                
                account_name=[select Name from Account where id=:BrandId].Name;
                
                sp_list_brand=[select id,CurrencyIsoCode from OEM_Sales_Plan_Ext_Data__c where Brand__c=:BrandId and isClose__c=false]; 
                
                currency_value=sp_list_brand[0].CurrencyIsoCode;
                
                if(curr_selected==null)curr_selected=currency_value;                    
                                    
                if(curr_selected!='USD'){
                    conversion_rate=1;}
                else {
                    conversion_rate=[SELECT ConversionRate FROM CurrencyType WHERE IsActive=TRUE and ISOCode=:currency_value].ConversionRate;}
                
                system.debug('conversion_rate ' + conversion_rate );                
        }
    
    }
    
    public List<SBPSimWrapper> getsbp_simulation(){
    
        //initialization
        pricesimul = new List<SBPSimWrapper>();
        
        message2 = '';
        
        try {
        
            if(sp_id != null){
            
                List<OEM_SBPP_Ext_Data__c> sbpList_For_Co = [Select Id, Name, First_Day__c,Month__c, Year__c, Month_Numeric__c, CreatedDate, 
                                                         PURE_PRICE_CONTRACTUAL_String__c,  PURE_PRICE_BIZ_WINS_String__c,  HLRR_String__c,
                                                         NICKEL_String__c,ALUMINUM_String__c,   MOLYBDENUM_String__c,OTHER_METALS_String__c,
                                                         ENG_CHANGES_String__c, FX_String__c,   ENDTOOLAMOR_String__c,ENDRD_EAMOR_String__c,
                                                         INTERESTRDE_TOOLAMO_String__c, LOGISTIC_PACKAGING_String__c,OTHER_String__c,
                                                         PURE_PRICE_CONTRACTUAL_For__c,  PURE_PRICE_BIZ_WINS_For__c,  HLRR_For__c,
                                                         NICKEL_For__c,ALUMINUM_For__c,   MOLYBDENUM_For__c,OTH_METALS_For__c,
                                                         ENG_CHANGES_For__c, FX_For__c,   ENDTOOLAMOR_For__c,ENDRD_EAMOR_For__c,
                                                         INTERESTRDE_TOOLAMO_For__c, LOGISTIC_PACKAGING_For__c,OTHER_For__c,
                                                         PURE_PRICE_CONTRACTUAL_Co__c,  PURE_PRICE_BIZ_WINS_Co__c,  HLRR_Co__c,
                                                         NICKEL_Co__c,ALUMINUM_Co__c,   MOLYBDENUM_Co__c,OTH_METALS_Co__c,
                                                         ENG_CHANGES_Co__c, FX_Co__c,   ENDTOOLAMOR_Co__c,ENDRD_EAMOR_Co__c,
                                                         INTERESTRDE_TOOLAMO_Co__c, LOGISTIC_PACKAGING_Co__c,OTHER_Co__c,
                                                         ALUMINUM_x_VOLUME__c,BIZ_WINS_x_VOLUME__c, ENDRD_EAMOR_x_VOLUME__c,ENDTOOLAMOR_x_VOLUME__c,
                                                         ENG_CHANGES_x_VOLUME__c,   FX_x_VOLUME__c, HLRR_x_VOLUME__c,INTERESTRDE_TOOLAMO_x_VOLUME__c,
                                                         LOGISTIC_PACKAGING_x_VOLUME__c,    MOLYBDENUM_x_VOLUME__c, NICKEL_x_VOLUME__c, OTHER_x_VOLUME__c,
                                                         OTH_METALS_x_VOLUME__c,PURE_PRICE_x_VOLUME__c,Volume__c,CurrencyIsoCode                                                      
                                                         from OEM_SBPP_Ext_Data__c Where Sales_Plan__c = :sp_id and isAOP__c=False and Year__c>=:curr_year
                                                         ORDER BY Year__c,Month_Numeric__c ASC];
                                                         
                 List<Price_Change_Detail__c> tot_Imp_Appr=[select Impact__c, Reason_Code__c from Price_Change_Detail__c where Status__c='Approved' 
                                                     and Should_Be_Price__c in (select id from OEM_SBPP_Ext_Data__c where Sales_Plan__c=:sp_id 
                                                     and Year__c=:curr_year) ];
                                                     
                 List<Price_Change_Detail__c> tot_Imp_Sub=[select Impact__c, Reason_Code__c from Price_Change_Detail__c where Status__c='Submitted' 
                                                     and Should_Be_Price__c in (select id from OEM_SBPP_Ext_Data__c where Sales_Plan__c=:sp_id 
                                                     and Year__c=:curr_year) ];
                                                      
                //system.debug ('sbpListVol ' + sbpListVol );
                
                system.debug ('tot_Imp_Appr ' + tot_Imp_Appr);
                system.debug ('tot_Imp_Sub ' + tot_Imp_Sub);
                
                if(!sbpList_For_Co.isEmpty()){ 
                    
                    Decimal ALUMINUM_Imp_Appr=0;
                    Decimal PURE_PRICE_BIZ_WINS_Imp_Appr=0;
                    Decimal ENDRD_EAMOR_Imp_Appr=0;
                    Decimal ENDTOOLAMOR_Imp_Appr=0;
                    Decimal ENG_CHANGES_Imp_Appr=0;
                    Decimal FX_Imp_Appr=0;
                    Decimal HLRR_Imp_Appr=0;
                    Decimal INTERESTRDE_TOOLAMO_Imp_Appr=0;
                    Decimal LOGISTIC_PACKAGING_Imp_Appr=0;
                    Decimal MOLYBDENUM_Imp_Appr=0;
                    Decimal NICKEL_Imp_Appr=0;
                    Decimal OTHER_Imp_Appr=0;
                    Decimal OTH_METALS_Imp_Appr=0;
                    Decimal PURE_PRICE_CONTRACTUAL_Imp_Appr=0;
                    
                    Decimal ALUMINUM_Imp_Sub=0;
                    Decimal PURE_PRICE_BIZ_WINS_Imp_Sub=0;
                    Decimal ENDRD_EAMOR_Imp_Sub=0;
                    Decimal ENDTOOLAMOR_Imp_Sub=0;
                    Decimal ENG_CHANGES_Imp_Sub=0;
                    Decimal FX_Imp_Sub=0;
                    Decimal HLRR_Imp_Sub=0;
                    Decimal INTERESTRDE_TOOLAMO_Imp_Sub=0;
                    Decimal LOGISTIC_PACKAGING_Imp_Sub=0;
                    Decimal MOLYBDENUM_Imp_Sub=0;
                    Decimal NICKEL_Imp_Sub=0;
                    Decimal OTHER_Imp_Sub=0;
                    Decimal OTH_METALS_Imp_Sub=0;
                    Decimal PURE_PRICE_CONTRACTUAL_Imp_Sub=0;
                    
                    Decimal ALUMINUM_FC=0;
                    Decimal PURE_PRICE_BIZ_WINS_FC=0;
                    Decimal ENDRD_EAMOR_FC=0;
                    Decimal ENDTOOLAMOR_FC=0;
                    Decimal ENG_CHANGES_FC=0;
                    Decimal FX_FC=0;
                    Decimal HLRR_FC=0;
                    Decimal INTERESTRDE_TOOLAMO_FC=0;
                    Decimal LOGISTIC_PACKAGING_FC=0;
                    Decimal MOLYBDENUM_FC=0;
                    Decimal NICKEL_FC=0;
                    Decimal OTHER_FC=0;
                    Decimal OTH_METALS_FC=0;
                    Decimal PURE_PRICE_CONTRACTUAL_FC=0;
                    
                    Decimal ALUMINUM_CO=0;
                    Decimal PURE_PRICE_BIZ_WINS_CO=0;
                    Decimal ENDRD_EAMOR_CO=0;
                    Decimal ENDTOOLAMOR_CO=0;
                    Decimal ENG_CHANGES_CO=0;
                    Decimal FX_CO=0;
                    Decimal HLRR_CO=0;
                    Decimal INTERESTRDE_TOOLAMO_CO=0;
                    Decimal LOGISTIC_PACKAGING_CO=0;
                    Decimal MOLYBDENUM_CO=0;
                    Decimal NICKEL_CO=0;
                    Decimal OTHER_CO=0;
                    Decimal OTH_METALS_CO=0;
                    Decimal PURE_PRICE_CONTRACTUAL_CO=0;
                    
                    Decimal ALUMINUM_CO_ny=0;
                    Decimal PURE_PRICE_BIZ_WINS_CO_ny=0;
                    Decimal ENDRD_EAMOR_CO_ny=0;
                    Decimal ENDTOOLAMOR_CO_ny=0;
                    Decimal ENG_CHANGES_CO_ny=0;
                    Decimal FX_CO_ny=0;
                    Decimal HLRR_CO_ny=0;
                    Decimal INTERESTRDE_TOOLAMO_CO_ny=0;
                    Decimal LOGISTIC_PACKAGING_CO_ny=0;
                    Decimal MOLYBDENUM_CO_ny=0;
                    Decimal NICKEL_CO_ny=0;
                    Decimal OTHER_CO_ny=0;
                    Decimal OTH_METALS_CO_ny=0;
                    Decimal PURE_PRICE_CONTRACTUAL_CO_ny=0;
                    
                    //system.debug('curr_selected pre if ' + curr_selected);  
                    
                    if(curr_selected==null)curr_selected=currency_value;
                    
                    //system.debug('curr_selected dopo if ' + curr_selected);  
                    
                    if(curr_selected!='USD'){
                        conversion_rate=1;}
                    else {
                        conversion_rate=[SELECT ConversionRate FROM CurrencyType WHERE IsActive=TRUE and ISOCode=:currency_value].ConversionRate;}
                    
                    //system.debug('conversion_rate ' + conversion_rate);  
                    
                    
                    for(Integer i=0; i<24; i++){                        
                    
                        if(i<12){
                            PURE_PRICE_BIZ_WINS_FC=PURE_PRICE_BIZ_WINS_FC + (sbpList_For_Co[i].PURE_PRICE_BIZ_WINS_For__c * sbpList_For_Co[i].Volume__c);
                            PURE_PRICE_CONTRACTUAL_FC=PURE_PRICE_CONTRACTUAL_FC + (sbpList_For_Co[i].PURE_PRICE_CONTRACTUAL_For__c * sbpList_For_Co[i].Volume__c);
                            NICKEL_FC=NICKEL_FC + (sbpList_For_Co[i].NICKEL_For__c * sbpList_For_Co[i].Volume__c);
                            ALUMINUM_FC=ALUMINUM_FC + (sbpList_For_Co[i].ALUMINUM_For__c * sbpList_For_Co[i].Volume__c);
                            MOLYBDENUM_FC=MOLYBDENUM_FC + (sbpList_For_Co[i].MOLYBDENUM_For__c * sbpList_For_Co[i].Volume__c);
                            OTH_METALS_FC=OTH_METALS_FC + (sbpList_For_Co[i].OTH_METALS_For__c * sbpList_For_Co[i].Volume__c);
                            ENG_CHANGES_FC=ENG_CHANGES_FC + (sbpList_For_Co[i].ENG_CHANGES_For__c * sbpList_For_Co[i].Volume__c);
                            FX_FC=FX_FC + (sbpList_For_Co[i].FX_For__c * sbpList_For_Co[i].Volume__c);
                            ENDTOOLAMOR_FC=ENDTOOLAMOR_FC + (sbpList_For_Co[i].ENDTOOLAMOR_For__c * sbpList_For_Co[i].Volume__c);
                            ENDRD_EAMOR_FC=ENDRD_EAMOR_FC + (sbpList_For_Co[i].ENDRD_EAMOR_For__c * sbpList_For_Co[i].Volume__c);
                            HLRR_FC=HLRR_FC + (sbpList_For_Co[i].HLRR_For__c * sbpList_For_Co[i].Volume__c);
                            INTERESTRDE_TOOLAMO_FC=INTERESTRDE_TOOLAMO_FC + (sbpList_For_Co[i].INTERESTRDE_TOOLAMO_For__c * sbpList_For_Co[i].Volume__c);
                            LOGISTIC_PACKAGING_FC=LOGISTIC_PACKAGING_FC + (sbpList_For_Co[i].LOGISTIC_PACKAGING_For__c * sbpList_For_Co[i].Volume__c);
                            OTHER_FC=OTHER_FC + (sbpList_For_Co[i].OTHER_For__c * sbpList_For_Co[i].Volume__c);
                            
                            PURE_PRICE_BIZ_WINS_CO=PURE_PRICE_BIZ_WINS_CO + (sbpList_For_Co[i].PURE_PRICE_BIZ_WINS_Co__c * sbpList_For_Co[i].Volume__c);
                            PURE_PRICE_CONTRACTUAL_CO=PURE_PRICE_CONTRACTUAL_CO + (sbpList_For_Co[i].PURE_PRICE_CONTRACTUAL_Co__c * sbpList_For_Co[i].Volume__c);
                            NICKEL_CO=NICKEL_CO + (sbpList_For_Co[i].NICKEL_Co__c * sbpList_For_Co[i].Volume__c);
                            ALUMINUM_CO=ALUMINUM_CO + (sbpList_For_Co[i].ALUMINUM_Co__c * sbpList_For_Co[i].Volume__c);
                            MOLYBDENUM_CO=MOLYBDENUM_CO + (sbpList_For_Co[i].MOLYBDENUM_Co__c * sbpList_For_Co[i].Volume__c);
                            OTH_METALS_CO=OTH_METALS_CO + (sbpList_For_Co[i].OTH_METALS_Co__c * sbpList_For_Co[i].Volume__c);
                            ENG_CHANGES_CO=ENG_CHANGES_CO + (sbpList_For_Co[i].ENG_CHANGES_Co__c * sbpList_For_Co[i].Volume__c);
                            FX_CO=FX_CO + (sbpList_For_Co[i].FX_Co__c * sbpList_For_Co[i].Volume__c);
                            ENDTOOLAMOR_CO=ENDTOOLAMOR_CO + (sbpList_For_Co[i].ENDTOOLAMOR_Co__c * sbpList_For_Co[i].Volume__c);
                            ENDRD_EAMOR_CO=ENDRD_EAMOR_CO + (sbpList_For_Co[i].ENDRD_EAMOR_Co__c * sbpList_For_Co[i].Volume__c);
                            HLRR_CO=HLRR_CO + (sbpList_For_Co[i].HLRR_Co__c * sbpList_For_Co[i].Volume__c);
                            INTERESTRDE_TOOLAMO_CO=INTERESTRDE_TOOLAMO_CO + (sbpList_For_Co[i].INTERESTRDE_TOOLAMO_Co__c * sbpList_For_Co[i].Volume__c);
                            LOGISTIC_PACKAGING_CO=LOGISTIC_PACKAGING_CO + (sbpList_For_Co[i].LOGISTIC_PACKAGING_Co__c * sbpList_For_Co[i].Volume__c);
                            OTHER_CO=OTHER_CO + (sbpList_For_Co[i].OTHER_Co__c * sbpList_For_Co[i].Volume__c);
                        
                        }  
                        else {
                            PURE_PRICE_BIZ_WINS_CO_ny=PURE_PRICE_BIZ_WINS_CO_ny + (sbpList_For_Co[i].PURE_PRICE_BIZ_WINS_Co__c * sbpList_For_Co[i].Volume__c);
                            PURE_PRICE_CONTRACTUAL_CO_ny=PURE_PRICE_CONTRACTUAL_CO_ny + (sbpList_For_Co[i].PURE_PRICE_CONTRACTUAL_Co__c * sbpList_For_Co[i].Volume__c);
                            NICKEL_CO_ny=NICKEL_CO_ny + (sbpList_For_Co[i].NICKEL_Co__c * sbpList_For_Co[i].Volume__c);
                            ALUMINUM_CO_ny=ALUMINUM_CO_ny + (sbpList_For_Co[i].ALUMINUM_Co__c * sbpList_For_Co[i].Volume__c);
                            MOLYBDENUM_CO_ny=MOLYBDENUM_CO_ny + (sbpList_For_Co[i].MOLYBDENUM_Co__c * sbpList_For_Co[i].Volume__c);
                            OTH_METALS_CO_ny=OTH_METALS_CO_ny + (sbpList_For_Co[i].OTH_METALS_Co__c * sbpList_For_Co[i].Volume__c);
                            ENG_CHANGES_CO_ny=ENG_CHANGES_CO_ny + (sbpList_For_Co[i].ENG_CHANGES_Co__c * sbpList_For_Co[i].Volume__c);
                            FX_CO_ny=FX_CO_ny + (sbpList_For_Co[i].FX_Co__c * sbpList_For_Co[i].Volume__c);
                            ENDTOOLAMOR_CO_ny=ENDTOOLAMOR_CO_ny + (sbpList_For_Co[i].ENDTOOLAMOR_Co__c * sbpList_For_Co[i].Volume__c);
                            ENDRD_EAMOR_CO_ny=ENDRD_EAMOR_CO_ny + (sbpList_For_Co[i].ENDRD_EAMOR_Co__c * sbpList_For_Co[i].Volume__c);
                            HLRR_CO_ny=HLRR_CO_ny + (sbpList_For_Co[i].HLRR_Co__c * sbpList_For_Co[i].Volume__c);
                            INTERESTRDE_TOOLAMO_CO_ny=INTERESTRDE_TOOLAMO_CO_ny + (sbpList_For_Co[i].INTERESTRDE_TOOLAMO_Co__c * sbpList_For_Co[i].Volume__c);
                            LOGISTIC_PACKAGING_CO_ny=LOGISTIC_PACKAGING_CO_ny + (sbpList_For_Co[i].LOGISTIC_PACKAGING_Co__c * sbpList_For_Co[i].Volume__c);
                            OTHER_CO_ny=OTHER_CO_ny + (sbpList_For_Co[i].OTHER_Co__c * sbpList_For_Co[i].Volume__c);
                        }  
                    
                    }
                    
                    if (!tot_Imp_Appr.isEmpty()){    
                        for(Price_Change_Detail__c tia: tot_Imp_Appr){  
                            
                            if(tia.Reason_Code__c=='Pure Price Contractual')PURE_PRICE_CONTRACTUAL_Imp_Appr= PURE_PRICE_CONTRACTUAL_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Pure Price Biz Win')PURE_PRICE_BIZ_WINS_Imp_Appr=PURE_PRICE_BIZ_WINS_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='VE/HLRR PT')HLRR_Imp_Appr=HLRR_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='Nickel')NICKEL_Imp_Appr= NICKEL_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Aluminium')ALUMINUM_Imp_Appr= ALUMINUM_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='Molybdenum')MOLYBDENUM_Imp_Appr= MOLYBDENUM_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='Other metals')OTH_METALS_Imp_Appr=OTH_METALS_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Eng. Changes')ENG_CHANGES_Imp_Appr=ENG_CHANGES_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='FX')PURE_PRICE_CONTRACTUAL_Imp_Appr=PURE_PRICE_CONTRACTUAL_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='End of Tooling amortization')FX_Imp_Appr=FX_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='End of RD&E amortization')ENDTOOLAMOR_Imp_Appr=ENDTOOLAMOR_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Eng. Changes')ENDRD_EAMOR_Imp_Appr=ENDRD_EAMOR_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Interest on RD&E & tooling amort.')INTERESTRDE_TOOLAMO_Imp_Appr=INTERESTRDE_TOOLAMO_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Logistic/Packaging')LOGISTIC_PACKAGING_Imp_Appr=LOGISTIC_PACKAGING_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Other')OTHER_Imp_Appr=OTHER_Imp_Appr + tia.Impact__c;
                        }
                    }
                    
                    if (!tot_Imp_Sub.isEmpty()){    
                        for(Price_Change_Detail__c tis: tot_Imp_Sub){  
                            
                            if(tis.Reason_Code__c=='Pure Price Contractual')PURE_PRICE_CONTRACTUAL_Imp_Sub=PURE_PRICE_CONTRACTUAL_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Pure Price Biz Win')PURE_PRICE_BIZ_WINS_Imp_Sub=PURE_PRICE_BIZ_WINS_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='VE/HLRR PT')HLRR_Imp_Sub=HLRR_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Nickel')NICKEL_Imp_Sub=NICKEL_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Aluminium')ALUMINUM_Imp_Sub=ALUMINUM_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='Molybdenum')MOLYBDENUM_Imp_Sub=MOLYBDENUM_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Other metals')OTH_METALS_Imp_Sub=OTH_METALS_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='Eng. Changes')ENG_CHANGES_Imp_Sub=ENG_CHANGES_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='FX')PURE_PRICE_CONTRACTUAL_Imp_Sub=PURE_PRICE_CONTRACTUAL_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='End of Tooling amortization')FX_Imp_Sub=FX_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='End of RD&E amortization')ENDTOOLAMOR_Imp_Sub=ENDTOOLAMOR_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Eng. Changes')ENDRD_EAMOR_Imp_Sub=ENDRD_EAMOR_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Interest on RD&E & tooling amort.')INTERESTRDE_TOOLAMO_Imp_Sub=INTERESTRDE_TOOLAMO_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Logistic/Packaging')LOGISTIC_PACKAGING_Imp_Sub=LOGISTIC_PACKAGING_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Other')OTHER_Imp_Sub=OTHER_Imp_Sub+ tis.Impact__c;
                        }
                    }
                    
                    if(PURE_PRICE_CONTRACTUAL_FC!=0 || PURE_PRICE_CONTRACTUAL_CO!=0)pricesimul.add(new SBPSimWrapper('Pure Price Contractual',PURE_PRICE_CONTRACTUAL_CO,PURE_PRICE_CONTRACTUAL_Imp_Appr,PURE_PRICE_CONTRACTUAL_Imp_Sub,PURE_PRICE_CONTRACTUAL_FC,(PURE_PRICE_CONTRACTUAL_FC + PURE_PRICE_CONTRACTUAL_CO + PURE_PRICE_CONTRACTUAL_Imp_Appr + PURE_PRICE_CONTRACTUAL_Imp_Sub),0,0,PURE_PRICE_CONTRACTUAL_CO_ny));
                    if(PURE_PRICE_BIZ_WINS_FC!=0 || PURE_PRICE_BIZ_WINS_CO!=0)pricesimul.add(new SBPSimWrapper('Pure Price Biz Win',PURE_PRICE_BIZ_WINS_CO,PURE_PRICE_BIZ_WINS_Imp_Appr,PURE_PRICE_BIZ_WINS_Imp_Sub,PURE_PRICE_BIZ_WINS_FC,(PURE_PRICE_BIZ_WINS_FC + PURE_PRICE_BIZ_WINS_CO + PURE_PRICE_BIZ_WINS_Imp_Appr + PURE_PRICE_BIZ_WINS_Imp_Sub),0,0,PURE_PRICE_BIZ_WINS_CO_ny));
                    if(HLRR_FC!=0 || HLRR_CO!=0)pricesimul.add(new SBPSimWrapper('VE/HLRR PT',HLRR_CO,HLRR_Imp_Appr,HLRR_Imp_Sub,HLRR_FC,(HLRR_FC + HLRR_CO +  HLRR_Imp_Appr +  HLRR_Imp_Sub),0,0,HLRR_CO_ny));
                    if(NICKEL_FC!=0 || NICKEL_CO!=0)pricesimul.add(new SBPSimWrapper('Nickel',NICKEL_CO,NICKEL_Imp_Appr,NICKEL_Imp_Sub,NICKEL_FC,(NICKEL_FC + NICKEL_CO + NICKEL_Imp_Appr + NICKEL_Imp_Sub),0,0,NICKEL_CO_ny));
                    if(ALUMINUM_FC!=0 || ALUMINUM_CO!=0)pricesimul.add(new SBPSimWrapper('Aluminium',ALUMINUM_CO,ALUMINUM_Imp_Appr,ALUMINUM_Imp_Sub,ALUMINUM_FC,(ALUMINUM_FC + ALUMINUM_CO + ALUMINUM_Imp_Appr + ALUMINUM_Imp_Sub),0,0,ALUMINUM_CO_ny));
                    if(MOLYBDENUM_FC!=0 || MOLYBDENUM_CO!=0)pricesimul.add(new SBPSimWrapper('Molybdenum',MOLYBDENUM_CO,MOLYBDENUM_Imp_Appr,MOLYBDENUM_Imp_Sub,MOLYBDENUM_FC,(MOLYBDENUM_FC + MOLYBDENUM_CO + MOLYBDENUM_Imp_Appr + MOLYBDENUM_Imp_Sub),0,0,MOLYBDENUM_CO_ny));
                    if(OTH_METALS_FC!=0 || OTH_METALS_CO!=0)pricesimul.add(new SBPSimWrapper('Other metals',OTH_METALS_CO,OTH_METALS_Imp_Appr,OTH_METALS_Imp_Sub,OTH_METALS_FC,(OTH_METALS_FC + OTH_METALS_CO + OTH_METALS_Imp_Appr + OTH_METALS_Imp_Sub),0,0,OTH_METALS_CO_ny));
                    if(ENG_CHANGES_FC!=0 || ENG_CHANGES_CO!=0)pricesimul.add(new SBPSimWrapper('Eng. Changes',ENG_CHANGES_CO,ENG_CHANGES_Imp_Appr,ENG_CHANGES_Imp_Sub,ENG_CHANGES_FC,(ENG_CHANGES_FC + ENG_CHANGES_CO + ENG_CHANGES_Imp_Appr + ENG_CHANGES_Imp_Sub),0,0,ENG_CHANGES_CO_ny));
                    if(FX_FC!=0 || FX_CO!=0)pricesimul.add(new SBPSimWrapper('FX',FX_CO,FX_Imp_Appr,FX_Imp_Sub,FX_FC,(FX_FC + FX_CO + FX_Imp_Appr + FX_Imp_Sub),0,0,FX_CO_ny));
                    if(ENDTOOLAMOR_FC!=0 || ENDTOOLAMOR_CO!=0)pricesimul.add(new SBPSimWrapper('End of Tooling amortization',ENDTOOLAMOR_CO,ENDTOOLAMOR_Imp_Appr,ENDTOOLAMOR_Imp_Sub,ENDTOOLAMOR_FC,(ENDTOOLAMOR_FC + ENDTOOLAMOR_CO + ENDTOOLAMOR_Imp_Appr + ENDTOOLAMOR_Imp_Sub),0,0,ENDTOOLAMOR_CO_ny));
                    if(ENDRD_EAMOR_FC!=0 || ENDRD_EAMOR_CO!=0)pricesimul.add(new SBPSimWrapper('End of RD&E amortization',ENDRD_EAMOR_CO,ENDRD_EAMOR_Imp_Appr,ENDRD_EAMOR_Imp_Sub,ENDRD_EAMOR_FC,(ENDRD_EAMOR_FC + ENDRD_EAMOR_CO + ENDRD_EAMOR_Imp_Appr + ENDRD_EAMOR_Imp_Sub),0,0,ENDRD_EAMOR_CO_ny));
                    if(INTERESTRDE_TOOLAMO_FC!=0 || INTERESTRDE_TOOLAMO_CO!=0)pricesimul.add(new SBPSimWrapper('Interest on RD&E & tooling amort.',INTERESTRDE_TOOLAMO_CO,INTERESTRDE_TOOLAMO_Imp_Appr,INTERESTRDE_TOOLAMO_Imp_Sub,INTERESTRDE_TOOLAMO_FC,(INTERESTRDE_TOOLAMO_FC + INTERESTRDE_TOOLAMO_CO + INTERESTRDE_TOOLAMO_Imp_Appr + INTERESTRDE_TOOLAMO_Imp_Sub),0,0,INTERESTRDE_TOOLAMO_CO_ny));
                    if(LOGISTIC_PACKAGING_FC!=0 || LOGISTIC_PACKAGING_CO!=0)pricesimul.add(new SBPSimWrapper('Logistic/Packaging',LOGISTIC_PACKAGING_CO,LOGISTIC_PACKAGING_Imp_Appr,LOGISTIC_PACKAGING_Imp_Sub,LOGISTIC_PACKAGING_FC,(LOGISTIC_PACKAGING_FC + LOGISTIC_PACKAGING_CO + LOGISTIC_PACKAGING_Imp_Appr + LOGISTIC_PACKAGING_Imp_Sub),0,0,LOGISTIC_PACKAGING_CO_ny));
                    if(OTHER_FC!=0 || OTHER_CO!=0)pricesimul.add(new SBPSimWrapper('Other',OTHER_CO,OTHER_Imp_Appr,OTHER_Imp_Sub,OTHER_FC,(OTHER_FC + OTHER_CO + OTHER_Imp_Appr + OTHER_Imp_Sub),0,0,OTHER_CO_ny));
                    
                }
             }   
            else {
            
                message2 = 'Should Be Price is empty';
            }
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }
        
        return pricesimul;           
    
    }
    
    public List<SBPSimWrapper> getsbp_simulation_py(){
    
        //initialization
        pricesimul = new List<SBPSimWrapper>();
        
        message2 = '';
        
        try {
        
            if(sp_id != null){
            
                List<OEM_SBPP_Ext_Data__c> sbpList_For_Co = [Select Id, Name, First_Day__c,Month__c, Year__c, Month_Numeric__c, CreatedDate, 
                                                         PURE_PRICE_CONTRACTUAL_String__c,  PURE_PRICE_BIZ_WINS_String__c,  HLRR_String__c,
                                                         NICKEL_String__c,ALUMINUM_String__c,   MOLYBDENUM_String__c,OTHER_METALS_String__c,
                                                         ENG_CHANGES_String__c, FX_String__c,   ENDTOOLAMOR_String__c,ENDRD_EAMOR_String__c,
                                                         INTERESTRDE_TOOLAMO_String__c, LOGISTIC_PACKAGING_String__c,OTHER_String__c,
                                                         PURE_PRICE_CONTRACTUAL_For__c,  PURE_PRICE_BIZ_WINS_For__c,  HLRR_For__c,
                                                         NICKEL_For__c,ALUMINUM_For__c,   MOLYBDENUM_For__c,OTH_METALS_For__c,
                                                         ENG_CHANGES_For__c, FX_For__c,   ENDTOOLAMOR_For__c,ENDRD_EAMOR_For__c,
                                                         INTERESTRDE_TOOLAMO_For__c, LOGISTIC_PACKAGING_For__c,OTHER_For__c,
                                                         PURE_PRICE_CONTRACTUAL_Co__c,  PURE_PRICE_BIZ_WINS_Co__c,  HLRR_Co__c,
                                                         NICKEL_Co__c,ALUMINUM_Co__c,   MOLYBDENUM_Co__c,OTH_METALS_Co__c,
                                                         ENG_CHANGES_Co__c, FX_Co__c,   ENDTOOLAMOR_Co__c,ENDRD_EAMOR_Co__c,
                                                         INTERESTRDE_TOOLAMO_Co__c, LOGISTIC_PACKAGING_Co__c,OTHER_Co__c,
                                                         ALUMINUM_x_VOLUME__c,BIZ_WINS_x_VOLUME__c, ENDRD_EAMOR_x_VOLUME__c,ENDTOOLAMOR_x_VOLUME__c,
                                                         ENG_CHANGES_x_VOLUME__c,   FX_x_VOLUME__c, HLRR_x_VOLUME__c,INTERESTRDE_TOOLAMO_x_VOLUME__c,
                                                         LOGISTIC_PACKAGING_x_VOLUME__c,    MOLYBDENUM_x_VOLUME__c, NICKEL_x_VOLUME__c, OTHER_x_VOLUME__c,
                                                         OTH_METALS_x_VOLUME__c,PURE_PRICE_x_VOLUME__c,Volume__c,CurrencyIsoCode                                                      
                                                         from OEM_SBPP_Ext_Data__c Where Sales_Plan__c = :sp_id and isAOP__c=False and Year__c<=:curr_year
                                                         ORDER BY Year__c,Month_Numeric__c ASC];
                                                      
                //system.debug ('sbpListVol ' + sbpListVol );
                 List<Price_Change_Detail__c> tot_Imp_Appr=[select Impact__c, Reason_Code__c from Price_Change_Detail__c where Status__c='Approved' 
                                                     and Should_Be_Price__c in (select id from OEM_SBPP_Ext_Data__c where Sales_Plan__c=:sp_id 
                                                     and Year__c<:curr_year) ];
                                                     
                 List<Price_Change_Detail__c> tot_Imp_Sub=[select Impact__c, Reason_Code__c from Price_Change_Detail__c where Status__c='Submitted' 
                                                     and Should_Be_Price__c in (select id from OEM_SBPP_Ext_Data__c where Sales_Plan__c=:sp_id 
                                                     and Year__c<:curr_year) ];
                
                if(!sbpList_For_Co.isEmpty()){ 
                    
                    Decimal ALUMINUM_Imp_Appr=0;
                    Decimal PURE_PRICE_BIZ_WINS_Imp_Appr=0;
                    Decimal ENDRD_EAMOR_Imp_Appr=0;
                    Decimal ENDTOOLAMOR_Imp_Appr=0;
                    Decimal ENG_CHANGES_Imp_Appr=0;
                    Decimal FX_Imp_Appr=0;
                    Decimal HLRR_Imp_Appr=0;
                    Decimal INTERESTRDE_TOOLAMO_Imp_Appr=0;
                    Decimal LOGISTIC_PACKAGING_Imp_Appr=0;
                    Decimal MOLYBDENUM_Imp_Appr=0;
                    Decimal NICKEL_Imp_Appr=0;
                    Decimal OTHER_Imp_Appr=0;
                    Decimal OTH_METALS_Imp_Appr=0;
                    Decimal PURE_PRICE_CONTRACTUAL_Imp_Appr=0;
                    
                    Decimal ALUMINUM_Imp_Sub=0;
                    Decimal PURE_PRICE_BIZ_WINS_Imp_Sub=0;
                    Decimal ENDRD_EAMOR_Imp_Sub=0;
                    Decimal ENDTOOLAMOR_Imp_Sub=0;
                    Decimal ENG_CHANGES_Imp_Sub=0;
                    Decimal FX_Imp_Sub=0;
                    Decimal HLRR_Imp_Sub=0;
                    Decimal INTERESTRDE_TOOLAMO_Imp_Sub=0;
                    Decimal LOGISTIC_PACKAGING_Imp_Sub=0;
                    Decimal MOLYBDENUM_Imp_Sub=0;
                    Decimal NICKEL_Imp_Sub=0;
                    Decimal OTHER_Imp_Sub=0;
                    Decimal OTH_METALS_Imp_Sub=0;
                    Decimal PURE_PRICE_CONTRACTUAL_Imp_Sub=0;
                    
                    Decimal ALUMINUM_FC=0;
                    Decimal PURE_PRICE_BIZ_WINS_FC=0;
                    Decimal ENDRD_EAMOR_FC=0;
                    Decimal ENDTOOLAMOR_FC=0;
                    Decimal ENG_CHANGES_FC=0;
                    Decimal FX_FC=0;
                    Decimal HLRR_FC=0;
                    Decimal INTERESTRDE_TOOLAMO_FC=0;
                    Decimal LOGISTIC_PACKAGING_FC=0;
                    Decimal MOLYBDENUM_FC=0;
                    Decimal NICKEL_FC=0;
                    Decimal OTHER_FC=0;
                    Decimal OTH_METALS_FC=0;
                    Decimal PURE_PRICE_CONTRACTUAL_FC=0;
                    
                    Decimal ALUMINUM_CO_ny=0;
                    Decimal PURE_PRICE_BIZ_WINS_CO_ny=0;
                    Decimal ENDRD_EAMOR_CO_ny=0;
                    Decimal ENDTOOLAMOR_CO_ny=0;
                    Decimal ENG_CHANGES_CO_ny=0;
                    Decimal FX_CO_ny=0;
                    Decimal HLRR_CO_ny=0;
                    Decimal INTERESTRDE_TOOLAMO_CO_ny=0;
                    Decimal LOGISTIC_PACKAGING_CO_ny=0;
                    Decimal MOLYBDENUM_CO_ny=0;
                    Decimal NICKEL_CO_ny=0;
                    Decimal OTHER_CO_ny=0;
                    Decimal OTH_METALS_CO_ny=0;
                    Decimal PURE_PRICE_CONTRACTUAL_CO_ny=0;
                    
                    //system.debug('curr_selected pre if ' + curr_selected);  
                    
                    if(curr_selected==null)curr_selected=currency_value;
                    
                    //system.debug('curr_selected dopo if ' + curr_selected);  
                    
                    if(curr_selected!='USD'){
                        conversion_rate=1;}
                    else {
                        conversion_rate=[SELECT ConversionRate FROM CurrencyType WHERE IsActive=TRUE and ISOCode=:currency_value].ConversionRate;}
                    
                    //system.debug('conversion_rate ' + conversion_rate);  
                    
                    
                    for(Integer i=0; i<24; i++){                        
                    
                        if(i<12){
                            PURE_PRICE_BIZ_WINS_FC=PURE_PRICE_BIZ_WINS_FC + (sbpList_For_Co[i].PURE_PRICE_BIZ_WINS_For__c * sbpList_For_Co[i].Volume__c);
                            PURE_PRICE_CONTRACTUAL_FC=PURE_PRICE_CONTRACTUAL_FC + (sbpList_For_Co[i].PURE_PRICE_CONTRACTUAL_For__c * sbpList_For_Co[i].Volume__c);
                            NICKEL_FC=NICKEL_FC + (sbpList_For_Co[i].NICKEL_For__c * sbpList_For_Co[i].Volume__c);
                            ALUMINUM_FC=ALUMINUM_FC + (sbpList_For_Co[i].ALUMINUM_For__c * sbpList_For_Co[i].Volume__c);
                            MOLYBDENUM_FC=MOLYBDENUM_FC + (sbpList_For_Co[i].MOLYBDENUM_For__c * sbpList_For_Co[i].Volume__c);
                            OTH_METALS_FC=OTH_METALS_FC + (sbpList_For_Co[i].OTH_METALS_For__c * sbpList_For_Co[i].Volume__c);
                            ENG_CHANGES_FC=ENG_CHANGES_FC + (sbpList_For_Co[i].ENG_CHANGES_For__c * sbpList_For_Co[i].Volume__c);
                            FX_FC=FX_FC + (sbpList_For_Co[i].FX_For__c * sbpList_For_Co[i].Volume__c);
                            ENDTOOLAMOR_FC=ENDTOOLAMOR_FC + (sbpList_For_Co[i].ENDTOOLAMOR_For__c * sbpList_For_Co[i].Volume__c);
                            ENDRD_EAMOR_FC=ENDRD_EAMOR_FC + (sbpList_For_Co[i].ENDRD_EAMOR_For__c * sbpList_For_Co[i].Volume__c);
                            HLRR_FC=HLRR_FC + (sbpList_For_Co[i].HLRR_For__c * sbpList_For_Co[i].Volume__c);
                            INTERESTRDE_TOOLAMO_FC=INTERESTRDE_TOOLAMO_FC + (sbpList_For_Co[i].INTERESTRDE_TOOLAMO_For__c * sbpList_For_Co[i].Volume__c);
                            LOGISTIC_PACKAGING_FC=LOGISTIC_PACKAGING_FC + (sbpList_For_Co[i].LOGISTIC_PACKAGING_For__c * sbpList_For_Co[i].Volume__c);
                            OTHER_FC=OTHER_FC + (sbpList_For_Co[i].OTHER_For__c * sbpList_For_Co[i].Volume__c);
                                                    
                        }  
                        else {
                            PURE_PRICE_BIZ_WINS_CO_ny=PURE_PRICE_BIZ_WINS_CO_ny + (sbpList_For_Co[i].PURE_PRICE_BIZ_WINS_Co__c * sbpList_For_Co[i].Volume__c);
                            PURE_PRICE_CONTRACTUAL_CO_ny=PURE_PRICE_CONTRACTUAL_CO_ny + (sbpList_For_Co[i].PURE_PRICE_CONTRACTUAL_Co__c * sbpList_For_Co[i].Volume__c);
                            NICKEL_CO_ny=NICKEL_CO_ny + (sbpList_For_Co[i].NICKEL_Co__c * sbpList_For_Co[i].Volume__c);
                            ALUMINUM_CO_ny=ALUMINUM_CO_ny + (sbpList_For_Co[i].ALUMINUM_Co__c * sbpList_For_Co[i].Volume__c);
                            MOLYBDENUM_CO_ny=MOLYBDENUM_CO_ny + (sbpList_For_Co[i].MOLYBDENUM_Co__c * sbpList_For_Co[i].Volume__c);
                            OTH_METALS_CO_ny=OTH_METALS_CO_ny + (sbpList_For_Co[i].OTH_METALS_Co__c * sbpList_For_Co[i].Volume__c);
                            ENG_CHANGES_CO_ny=ENG_CHANGES_CO_ny + (sbpList_For_Co[i].ENG_CHANGES_Co__c * sbpList_For_Co[i].Volume__c);
                            FX_CO_ny=FX_CO_ny + (sbpList_For_Co[i].FX_Co__c * sbpList_For_Co[i].Volume__c);
                            ENDTOOLAMOR_CO_ny=ENDTOOLAMOR_CO_ny + (sbpList_For_Co[i].ENDTOOLAMOR_Co__c * sbpList_For_Co[i].Volume__c);
                            ENDRD_EAMOR_CO_ny=ENDRD_EAMOR_CO_ny + (sbpList_For_Co[i].ENDRD_EAMOR_Co__c * sbpList_For_Co[i].Volume__c);
                            HLRR_CO_ny=HLRR_CO_ny + (sbpList_For_Co[i].HLRR_Co__c * sbpList_For_Co[i].Volume__c);
                            INTERESTRDE_TOOLAMO_CO_ny=INTERESTRDE_TOOLAMO_CO_ny + (sbpList_For_Co[i].INTERESTRDE_TOOLAMO_Co__c * sbpList_For_Co[i].Volume__c);
                            LOGISTIC_PACKAGING_CO_ny=LOGISTIC_PACKAGING_CO_ny + (sbpList_For_Co[i].LOGISTIC_PACKAGING_Co__c * sbpList_For_Co[i].Volume__c);
                            OTHER_CO_ny=OTHER_CO_ny + (sbpList_For_Co[i].OTHER_Co__c * sbpList_For_Co[i].Volume__c);
                        }  
                    
                    }
                    
                    if (!tot_Imp_Appr.isEmpty()){    
                        for(Price_Change_Detail__c tia: tot_Imp_Appr){  
                            
                            if(tia.Reason_Code__c=='Pure Price Contractual')PURE_PRICE_CONTRACTUAL_Imp_Appr= PURE_PRICE_CONTRACTUAL_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Pure Price Biz Win')PURE_PRICE_BIZ_WINS_Imp_Appr=PURE_PRICE_BIZ_WINS_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='VE/HLRR PT')HLRR_Imp_Appr=HLRR_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='Nickel')NICKEL_Imp_Appr= NICKEL_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Aluminium')ALUMINUM_Imp_Appr= ALUMINUM_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='Molybdenum')MOLYBDENUM_Imp_Appr= MOLYBDENUM_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='Other metals')OTH_METALS_Imp_Appr=OTH_METALS_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Eng. Changes')ENG_CHANGES_Imp_Appr=ENG_CHANGES_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='FX')PURE_PRICE_CONTRACTUAL_Imp_Appr=PURE_PRICE_CONTRACTUAL_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='End of Tooling amortization')FX_Imp_Appr=FX_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='End of RD&E amortization')ENDTOOLAMOR_Imp_Appr=ENDTOOLAMOR_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Eng. Changes')ENDRD_EAMOR_Imp_Appr=ENDRD_EAMOR_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Interest on RD&E & tooling amort.')INTERESTRDE_TOOLAMO_Imp_Appr=INTERESTRDE_TOOLAMO_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Logistic/Packaging')LOGISTIC_PACKAGING_Imp_Appr=LOGISTIC_PACKAGING_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Other')OTHER_Imp_Appr=OTHER_Imp_Appr + tia.Impact__c;
                        }
                    }
                    
                    if (!tot_Imp_Sub.isEmpty()){    
                        for(Price_Change_Detail__c tis: tot_Imp_Sub){  
                            
                            if(tis.Reason_Code__c=='Pure Price Contractual')PURE_PRICE_CONTRACTUAL_Imp_Sub=PURE_PRICE_CONTRACTUAL_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Pure Price Biz Win')PURE_PRICE_BIZ_WINS_Imp_Sub=PURE_PRICE_BIZ_WINS_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='VE/HLRR PT')HLRR_Imp_Sub=HLRR_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Nickel')NICKEL_Imp_Sub=NICKEL_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Aluminium')ALUMINUM_Imp_Sub=ALUMINUM_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='Molybdenum')MOLYBDENUM_Imp_Sub=MOLYBDENUM_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Other metals')OTH_METALS_Imp_Sub=OTH_METALS_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='Eng. Changes')ENG_CHANGES_Imp_Sub=ENG_CHANGES_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='FX')PURE_PRICE_CONTRACTUAL_Imp_Sub=PURE_PRICE_CONTRACTUAL_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='End of Tooling amortization')FX_Imp_Sub=FX_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='End of RD&E amortization')ENDTOOLAMOR_Imp_Sub=ENDTOOLAMOR_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Eng. Changes')ENDRD_EAMOR_Imp_Sub=ENDRD_EAMOR_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Interest on RD&E & tooling amort.')INTERESTRDE_TOOLAMO_Imp_Sub=INTERESTRDE_TOOLAMO_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Logistic/Packaging')LOGISTIC_PACKAGING_Imp_Sub=LOGISTIC_PACKAGING_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Other')OTHER_Imp_Sub=OTHER_Imp_Sub+ tis.Impact__c;
                        }
                    }
                    
                    if(PURE_PRICE_CONTRACTUAL_FC!=0)pricesimul.add(new SBPSimWrapper('Pure Price Contractual',0,PURE_PRICE_CONTRACTUAL_Imp_Appr,PURE_PRICE_CONTRACTUAL_Imp_Sub,PURE_PRICE_CONTRACTUAL_FC,(PURE_PRICE_CONTRACTUAL_FC + PURE_PRICE_CONTRACTUAL_Imp_Appr+PURE_PRICE_CONTRACTUAL_Imp_Sub),0,0,PURE_PRICE_CONTRACTUAL_CO_ny));
                    if(PURE_PRICE_BIZ_WINS_FC!=0 )pricesimul.add(new SBPSimWrapper('Pure Price Biz Win',0,PURE_PRICE_BIZ_WINS_Imp_Appr,PURE_PRICE_BIZ_WINS_Imp_Sub,PURE_PRICE_BIZ_WINS_FC,(PURE_PRICE_BIZ_WINS_FC + PURE_PRICE_BIZ_WINS_Imp_Appr+PURE_PRICE_BIZ_WINS_Imp_Sub),0,0,PURE_PRICE_BIZ_WINS_CO_ny));
                    if(HLRR_FC!=0 )pricesimul.add(new SBPSimWrapper('VE/HLRR PT',0,HLRR_Imp_Appr,HLRR_Imp_Sub,HLRR_FC,(HLRR_FC + HLRR_Imp_Appr+HLRR_Imp_Sub),0,0,HLRR_CO_ny));
                    if(NICKEL_FC!=0 )pricesimul.add(new SBPSimWrapper('Nickel',0,NICKEL_Imp_Appr,NICKEL_Imp_Sub,NICKEL_FC,(NICKEL_FC + NICKEL_Imp_Appr+NICKEL_Imp_Sub),0,0,NICKEL_CO_ny));
                    if(ALUMINUM_FC!=0 )pricesimul.add(new SBPSimWrapper('Aluminium',0,ALUMINUM_Imp_Appr,ALUMINUM_Imp_Sub,ALUMINUM_FC,(ALUMINUM_FC + ALUMINUM_Imp_Appr+ALUMINUM_Imp_Sub),0,0,ALUMINUM_CO_ny));
                    if(MOLYBDENUM_FC!=0 )pricesimul.add(new SBPSimWrapper('Molybdenum',0,MOLYBDENUM_Imp_Appr,MOLYBDENUM_Imp_Sub,MOLYBDENUM_FC,(MOLYBDENUM_FC + MOLYBDENUM_Imp_Appr+MOLYBDENUM_Imp_Sub),0,0,MOLYBDENUM_CO_ny));
                    if(OTH_METALS_FC!=0 )pricesimul.add(new SBPSimWrapper('Other metals',0,OTH_METALS_Imp_Appr,OTH_METALS_Imp_Sub,OTH_METALS_FC,(OTH_METALS_FC + OTH_METALS_Imp_Appr+OTH_METALS_Imp_Sub),0,0,OTH_METALS_CO_ny));
                    if(ENG_CHANGES_FC!=0 )pricesimul.add(new SBPSimWrapper('Eng. Changes',0,ENG_CHANGES_Imp_Appr,ENG_CHANGES_Imp_Sub,ENG_CHANGES_FC,(ENG_CHANGES_FC + ENG_CHANGES_Imp_Appr+ENG_CHANGES_Imp_Sub),0,0,ENG_CHANGES_CO_ny));
                    if(FX_FC!=0 )pricesimul.add(new SBPSimWrapper('FX',0,FX_Imp_Appr,FX_Imp_Sub,FX_FC,(FX_FC + FX_Imp_Appr+FX_Imp_Sub),0,0,FX_CO_ny));
                    if(ENDTOOLAMOR_FC!=0 )pricesimul.add(new SBPSimWrapper('End of Tooling amortization',0,ENDTOOLAMOR_Imp_Appr,ENDTOOLAMOR_Imp_Sub,ENDTOOLAMOR_FC,(ENDTOOLAMOR_FC + ENDTOOLAMOR_Imp_Appr+ENDTOOLAMOR_Imp_Sub),0,0,ENDTOOLAMOR_CO_ny));
                    if(ENDRD_EAMOR_FC!=0 )pricesimul.add(new SBPSimWrapper('End of RD&E amortization',0,ENDRD_EAMOR_Imp_Appr,ENDRD_EAMOR_Imp_Sub,ENDRD_EAMOR_FC,(ENDRD_EAMOR_FC + ENDRD_EAMOR_Imp_Appr+ENDRD_EAMOR_Imp_Sub),0,0,ENDRD_EAMOR_CO_ny));
                    if(INTERESTRDE_TOOLAMO_FC!=0)pricesimul.add(new SBPSimWrapper('Interest on RD&E & tooling amort.',0,INTERESTRDE_TOOLAMO_Imp_Appr,INTERESTRDE_TOOLAMO_Imp_Sub,INTERESTRDE_TOOLAMO_FC,(INTERESTRDE_TOOLAMO_FC + INTERESTRDE_TOOLAMO_Imp_Appr+INTERESTRDE_TOOLAMO_Imp_Sub),0,0,INTERESTRDE_TOOLAMO_CO_ny));
                    if(LOGISTIC_PACKAGING_FC!=0 )pricesimul.add(new SBPSimWrapper('Logistic/Packaging',0,LOGISTIC_PACKAGING_Imp_Appr,LOGISTIC_PACKAGING_Imp_Sub,LOGISTIC_PACKAGING_FC,(LOGISTIC_PACKAGING_FC + LOGISTIC_PACKAGING_Imp_Appr+LOGISTIC_PACKAGING_Imp_Sub),0,0,LOGISTIC_PACKAGING_CO_ny));
                    if(OTHER_FC!=0 )pricesimul.add(new SBPSimWrapper('Other',0,OTHER_Imp_Appr,OTHER_Imp_Sub,OTHER_FC,(OTHER_FC + OTHER_Imp_Appr+OTHER_Imp_Sub),0,0,OTHER_CO_ny));
                    
                }
             }   
            else {
            
                message2 = 'Should Be Price is empty';
            }
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }
        
        return pricesimul;           
    
    }
    
    public List<SBPSimWrapper> getsbp_simulation_ny(){
    
        //initialization
        pricesimul = new List<SBPSimWrapper>();
        
        message2 = '';
        
        try {
        
            if(sp_id != null){
            
                List<OEM_SBPP_Ext_Data__c> sbpList_For_Co = [Select Id, Name, First_Day__c,Month__c, Year__c, Month_Numeric__c, CreatedDate, 
                                                         PURE_PRICE_CONTRACTUAL_String__c,  PURE_PRICE_BIZ_WINS_String__c,  HLRR_String__c,
                                                         NICKEL_String__c,ALUMINUM_String__c,   MOLYBDENUM_String__c,OTHER_METALS_String__c,
                                                         ENG_CHANGES_String__c, FX_String__c,   ENDTOOLAMOR_String__c,ENDRD_EAMOR_String__c,
                                                         INTERESTRDE_TOOLAMO_String__c, LOGISTIC_PACKAGING_String__c,OTHER_String__c,
                                                         PURE_PRICE_CONTRACTUAL_For__c,  PURE_PRICE_BIZ_WINS_For__c,  HLRR_For__c,
                                                         NICKEL_For__c,ALUMINUM_For__c,   MOLYBDENUM_For__c,OTH_METALS_For__c,
                                                         ENG_CHANGES_For__c, FX_For__c,   ENDTOOLAMOR_For__c,ENDRD_EAMOR_For__c,
                                                         INTERESTRDE_TOOLAMO_For__c, LOGISTIC_PACKAGING_For__c,OTHER_For__c,
                                                         PURE_PRICE_CONTRACTUAL_Co__c,  PURE_PRICE_BIZ_WINS_Co__c,  HLRR_Co__c,
                                                         NICKEL_Co__c,ALUMINUM_Co__c,   MOLYBDENUM_Co__c,OTH_METALS_Co__c,
                                                         ENG_CHANGES_Co__c, FX_Co__c,   ENDTOOLAMOR_Co__c,ENDRD_EAMOR_Co__c,
                                                         INTERESTRDE_TOOLAMO_Co__c, LOGISTIC_PACKAGING_Co__c,OTHER_Co__c,
                                                         ALUMINUM_x_VOLUME__c,BIZ_WINS_x_VOLUME__c, ENDRD_EAMOR_x_VOLUME__c,ENDTOOLAMOR_x_VOLUME__c,
                                                         ENG_CHANGES_x_VOLUME__c,   FX_x_VOLUME__c, HLRR_x_VOLUME__c,INTERESTRDE_TOOLAMO_x_VOLUME__c,
                                                         LOGISTIC_PACKAGING_x_VOLUME__c,    MOLYBDENUM_x_VOLUME__c, NICKEL_x_VOLUME__c, OTHER_x_VOLUME__c,
                                                         OTH_METALS_x_VOLUME__c,PURE_PRICE_x_VOLUME__c,Volume__c,CurrencyIsoCode                                                      
                                                         from OEM_SBPP_Ext_Data__c Where Sales_Plan__c = :sp_id and isAOP__c=False and Year__c>:curr_year
                                                         ORDER BY Year__c,Month_Numeric__c ASC];
                                                      
                //system.debug ('sbpListVol ' + sbpListVol );
                List<Price_Change_Detail__c> tot_Imp_Appr=[select Impact__c, Reason_Code__c from Price_Change_Detail__c where Status__c='Approved' 
                                                     and Should_Be_Price__c in (select id from OEM_SBPP_Ext_Data__c where Sales_Plan__c=:sp_id 
                                                     and Year__c<:curr_year) ];
                                                     
                 List<Price_Change_Detail__c> tot_Imp_Sub=[select Impact__c, Reason_Code__c from Price_Change_Detail__c where Status__c='Submitted' 
                                                     and Should_Be_Price__c in (select id from OEM_SBPP_Ext_Data__c where Sales_Plan__c=:sp_id 
                                                     and Year__c<:curr_year) ];
                
                if(!sbpList_For_Co.isEmpty()){ 
                    
                    Decimal ALUMINUM_Imp_Appr=0;
                    Decimal PURE_PRICE_BIZ_WINS_Imp_Appr=0;
                    Decimal ENDRD_EAMOR_Imp_Appr=0;
                    Decimal ENDTOOLAMOR_Imp_Appr=0;
                    Decimal ENG_CHANGES_Imp_Appr=0;
                    Decimal FX_Imp_Appr=0;
                    Decimal HLRR_Imp_Appr=0;
                    Decimal INTERESTRDE_TOOLAMO_Imp_Appr=0;
                    Decimal LOGISTIC_PACKAGING_Imp_Appr=0;
                    Decimal MOLYBDENUM_Imp_Appr=0;
                    Decimal NICKEL_Imp_Appr=0;
                    Decimal OTHER_Imp_Appr=0;
                    Decimal OTH_METALS_Imp_Appr=0;
                    Decimal PURE_PRICE_CONTRACTUAL_Imp_Appr=0;
                    
                    Decimal ALUMINUM_Imp_Sub=0;
                    Decimal PURE_PRICE_BIZ_WINS_Imp_Sub=0;
                    Decimal ENDRD_EAMOR_Imp_Sub=0;
                    Decimal ENDTOOLAMOR_Imp_Sub=0;
                    Decimal ENG_CHANGES_Imp_Sub=0;
                    Decimal FX_Imp_Sub=0;
                    Decimal HLRR_Imp_Sub=0;
                    Decimal INTERESTRDE_TOOLAMO_Imp_Sub=0;
                    Decimal LOGISTIC_PACKAGING_Imp_Sub=0;
                    Decimal MOLYBDENUM_Imp_Sub=0;
                    Decimal NICKEL_Imp_Sub=0;
                    Decimal OTHER_Imp_Sub=0;
                    Decimal OTH_METALS_Imp_Sub=0;
                    Decimal PURE_PRICE_CONTRACTUAL_Imp_Sub=0;
                    
                    Decimal ALUMINUM_FC=0;
                    Decimal PURE_PRICE_BIZ_WINS_FC=0;
                    Decimal ENDRD_EAMOR_FC=0;
                    Decimal ENDTOOLAMOR_FC=0;
                    Decimal ENG_CHANGES_FC=0;
                    Decimal FX_FC=0;
                    Decimal HLRR_FC=0;
                    Decimal INTERESTRDE_TOOLAMO_FC=0;
                    Decimal LOGISTIC_PACKAGING_FC=0;
                    Decimal MOLYBDENUM_FC=0;
                    Decimal NICKEL_FC=0;
                    Decimal OTHER_FC=0;
                    Decimal OTH_METALS_FC=0;
                    Decimal PURE_PRICE_CONTRACTUAL_FC=0;
                    
                    Decimal ALUMINUM_CO=0;
                    Decimal PURE_PRICE_BIZ_WINS_CO=0;
                    Decimal ENDRD_EAMOR_CO=0;
                    Decimal ENDTOOLAMOR_CO=0;
                    Decimal ENG_CHANGES_CO=0;
                    Decimal FX_CO=0;
                    Decimal HLRR_CO=0;
                    Decimal INTERESTRDE_TOOLAMO_CO=0;
                    Decimal LOGISTIC_PACKAGING_CO=0;
                    Decimal MOLYBDENUM_CO=0;
                    Decimal NICKEL_CO=0;
                    Decimal OTHER_CO=0;
                    Decimal OTH_METALS_CO=0;
                    Decimal PURE_PRICE_CONTRACTUAL_CO=0;
                    
                    //system.debug('curr_selected pre if ' + curr_selected);  
                    
                    if(curr_selected==null)curr_selected=currency_value;
                    
                    //system.debug('curr_selected dopo if ' + curr_selected);  
                    
                    if(curr_selected!='USD'){
                        conversion_rate=1;}
                    else {
                        conversion_rate=[SELECT ConversionRate FROM CurrencyType WHERE IsActive=TRUE and ISOCode=:currency_value].ConversionRate;}
                    
                    //system.debug('conversion_rate ' + conversion_rate);  
                    
                    
                    for(Integer i=0; i<24; i++){                        
                    
                        if(i<12){
                            PURE_PRICE_BIZ_WINS_FC=PURE_PRICE_BIZ_WINS_FC + (sbpList_For_Co[i].PURE_PRICE_BIZ_WINS_For__c * sbpList_For_Co[i].Volume__c);
                            PURE_PRICE_CONTRACTUAL_FC=PURE_PRICE_CONTRACTUAL_FC + (sbpList_For_Co[i].PURE_PRICE_CONTRACTUAL_For__c * sbpList_For_Co[i].Volume__c);
                            NICKEL_FC=NICKEL_FC + (sbpList_For_Co[i].NICKEL_For__c * sbpList_For_Co[i].Volume__c);
                            ALUMINUM_FC=ALUMINUM_FC + (sbpList_For_Co[i].ALUMINUM_For__c * sbpList_For_Co[i].Volume__c);
                            MOLYBDENUM_FC=MOLYBDENUM_FC + (sbpList_For_Co[i].MOLYBDENUM_For__c * sbpList_For_Co[i].Volume__c);
                            OTH_METALS_FC=OTH_METALS_FC + (sbpList_For_Co[i].OTH_METALS_For__c * sbpList_For_Co[i].Volume__c);
                            ENG_CHANGES_FC=ENG_CHANGES_FC + (sbpList_For_Co[i].ENG_CHANGES_For__c * sbpList_For_Co[i].Volume__c);
                            FX_FC=FX_FC + (sbpList_For_Co[i].FX_For__c * sbpList_For_Co[i].Volume__c);
                            ENDTOOLAMOR_FC=ENDTOOLAMOR_FC + (sbpList_For_Co[i].ENDTOOLAMOR_For__c * sbpList_For_Co[i].Volume__c);
                            ENDRD_EAMOR_FC=ENDRD_EAMOR_FC + (sbpList_For_Co[i].ENDRD_EAMOR_For__c * sbpList_For_Co[i].Volume__c);
                            HLRR_FC=HLRR_FC + (sbpList_For_Co[i].HLRR_For__c * sbpList_For_Co[i].Volume__c);
                            INTERESTRDE_TOOLAMO_FC=INTERESTRDE_TOOLAMO_FC + (sbpList_For_Co[i].INTERESTRDE_TOOLAMO_For__c * sbpList_For_Co[i].Volume__c);
                            LOGISTIC_PACKAGING_FC=LOGISTIC_PACKAGING_FC + (sbpList_For_Co[i].LOGISTIC_PACKAGING_For__c * sbpList_For_Co[i].Volume__c);
                            OTHER_FC=OTHER_FC + (sbpList_For_Co[i].OTHER_For__c * sbpList_For_Co[i].Volume__c);
                            
                            PURE_PRICE_BIZ_WINS_CO=PURE_PRICE_BIZ_WINS_CO + (sbpList_For_Co[i].PURE_PRICE_BIZ_WINS_Co__c * sbpList_For_Co[i].Volume__c);
                            PURE_PRICE_CONTRACTUAL_CO=PURE_PRICE_CONTRACTUAL_CO + (sbpList_For_Co[i].PURE_PRICE_CONTRACTUAL_Co__c * sbpList_For_Co[i].Volume__c);
                            NICKEL_CO=NICKEL_CO + (sbpList_For_Co[i].NICKEL_Co__c * sbpList_For_Co[i].Volume__c);
                            ALUMINUM_CO=ALUMINUM_CO + (sbpList_For_Co[i].ALUMINUM_Co__c * sbpList_For_Co[i].Volume__c);
                            MOLYBDENUM_CO=MOLYBDENUM_CO + (sbpList_For_Co[i].MOLYBDENUM_Co__c * sbpList_For_Co[i].Volume__c);
                            OTH_METALS_CO=OTH_METALS_CO + (sbpList_For_Co[i].OTH_METALS_Co__c * sbpList_For_Co[i].Volume__c);
                            ENG_CHANGES_CO=ENG_CHANGES_CO + (sbpList_For_Co[i].ENG_CHANGES_Co__c * sbpList_For_Co[i].Volume__c);
                            FX_CO=FX_CO + (sbpList_For_Co[i].FX_Co__c * sbpList_For_Co[i].Volume__c);
                            ENDTOOLAMOR_CO=ENDTOOLAMOR_CO + (sbpList_For_Co[i].ENDTOOLAMOR_Co__c * sbpList_For_Co[i].Volume__c);
                            ENDRD_EAMOR_CO=ENDRD_EAMOR_CO + (sbpList_For_Co[i].ENDRD_EAMOR_Co__c * sbpList_For_Co[i].Volume__c);
                            HLRR_CO=HLRR_CO + (sbpList_For_Co[i].HLRR_Co__c * sbpList_For_Co[i].Volume__c);
                            INTERESTRDE_TOOLAMO_CO=INTERESTRDE_TOOLAMO_CO + (sbpList_For_Co[i].INTERESTRDE_TOOLAMO_Co__c * sbpList_For_Co[i].Volume__c);
                            LOGISTIC_PACKAGING_CO=LOGISTIC_PACKAGING_CO + (sbpList_For_Co[i].LOGISTIC_PACKAGING_Co__c * sbpList_For_Co[i].Volume__c);
                            OTHER_CO=OTHER_CO + (sbpList_For_Co[i].OTHER_Co__c * sbpList_For_Co[i].Volume__c);
                        
                        }                         
                    
                    }
                    
                    if (!tot_Imp_Appr.isEmpty()){    
                        for(Price_Change_Detail__c tia: tot_Imp_Appr){  
                            
                            if(tia.Reason_Code__c=='Pure Price Contractual')PURE_PRICE_CONTRACTUAL_Imp_Appr= PURE_PRICE_CONTRACTUAL_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Pure Price Biz Win')PURE_PRICE_BIZ_WINS_Imp_Appr=PURE_PRICE_BIZ_WINS_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='VE/HLRR PT')HLRR_Imp_Appr=HLRR_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='Nickel')NICKEL_Imp_Appr= NICKEL_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Aluminium')ALUMINUM_Imp_Appr= ALUMINUM_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='Molybdenum')MOLYBDENUM_Imp_Appr= MOLYBDENUM_Imp_Appr+ tia.Impact__c;
                            if(tia.Reason_Code__c=='Other metals')OTH_METALS_Imp_Appr=OTH_METALS_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Eng. Changes')ENG_CHANGES_Imp_Appr=ENG_CHANGES_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='FX')PURE_PRICE_CONTRACTUAL_Imp_Appr=PURE_PRICE_CONTRACTUAL_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='End of Tooling amortization')FX_Imp_Appr=FX_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='End of RD&E amortization')ENDTOOLAMOR_Imp_Appr=ENDTOOLAMOR_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Eng. Changes')ENDRD_EAMOR_Imp_Appr=ENDRD_EAMOR_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Interest on RD&E & tooling amort.')INTERESTRDE_TOOLAMO_Imp_Appr=INTERESTRDE_TOOLAMO_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Logistic/Packaging')LOGISTIC_PACKAGING_Imp_Appr=LOGISTIC_PACKAGING_Imp_Appr + tia.Impact__c;
                            if(tia.Reason_Code__c=='Other')OTHER_Imp_Appr=OTHER_Imp_Appr + tia.Impact__c;
                        }
                    }
                    
                    if (!tot_Imp_Sub.isEmpty()){    
                        for(Price_Change_Detail__c tis: tot_Imp_Sub){  
                            
                            if(tis.Reason_Code__c=='Pure Price Contractual')PURE_PRICE_CONTRACTUAL_Imp_Sub=PURE_PRICE_CONTRACTUAL_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Pure Price Biz Win')PURE_PRICE_BIZ_WINS_Imp_Sub=PURE_PRICE_BIZ_WINS_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='VE/HLRR PT')HLRR_Imp_Sub=HLRR_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Nickel')NICKEL_Imp_Sub=NICKEL_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Aluminium')ALUMINUM_Imp_Sub=ALUMINUM_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='Molybdenum')MOLYBDENUM_Imp_Sub=MOLYBDENUM_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Other metals')OTH_METALS_Imp_Sub=OTH_METALS_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='Eng. Changes')ENG_CHANGES_Imp_Sub=ENG_CHANGES_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='FX')PURE_PRICE_CONTRACTUAL_Imp_Sub=PURE_PRICE_CONTRACTUAL_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='End of Tooling amortization')FX_Imp_Sub=FX_Imp_Sub + tis.Impact__c;
                            if(tis.Reason_Code__c=='End of RD&E amortization')ENDTOOLAMOR_Imp_Sub=ENDTOOLAMOR_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Eng. Changes')ENDRD_EAMOR_Imp_Sub=ENDRD_EAMOR_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Interest on RD&E & tooling amort.')INTERESTRDE_TOOLAMO_Imp_Sub=INTERESTRDE_TOOLAMO_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Logistic/Packaging')LOGISTIC_PACKAGING_Imp_Sub=LOGISTIC_PACKAGING_Imp_Sub+ tis.Impact__c;
                            if(tis.Reason_Code__c=='Other')OTHER_Imp_Sub=OTHER_Imp_Sub+ tis.Impact__c;
                        }
                    }
                    
                    if(PURE_PRICE_CONTRACTUAL_FC!=0 || PURE_PRICE_CONTRACTUAL_CO!=0)pricesimul.add(new SBPSimWrapper('Pure Price Contractual',PURE_PRICE_CONTRACTUAL_CO,PURE_PRICE_CONTRACTUAL_Imp_Appr,PURE_PRICE_CONTRACTUAL_Imp_Sub,PURE_PRICE_CONTRACTUAL_FC,(PURE_PRICE_CONTRACTUAL_FC + PURE_PRICE_CONTRACTUAL_CO + PURE_PRICE_CONTRACTUAL_Imp_Appr+PURE_PRICE_CONTRACTUAL_Imp_Sub),0,0,0));
                    if(PURE_PRICE_BIZ_WINS_FC!=0 || PURE_PRICE_BIZ_WINS_CO!=0)pricesimul.add(new SBPSimWrapper('Pure Price Biz Win',PURE_PRICE_BIZ_WINS_CO,PURE_PRICE_BIZ_WINS_Imp_Appr,PURE_PRICE_BIZ_WINS_Imp_Sub,PURE_PRICE_BIZ_WINS_FC,(PURE_PRICE_BIZ_WINS_FC + PURE_PRICE_BIZ_WINS_CO + PURE_PRICE_BIZ_WINS_Imp_Appr+PURE_PRICE_BIZ_WINS_Imp_Sub),0,0,0));
                    if(HLRR_FC!=0 || HLRR_CO!=0)pricesimul.add(new SBPSimWrapper('VE/HLRR PT',HLRR_CO,HLRR_Imp_Appr,HLRR_Imp_Sub,HLRR_FC,(HLRR_FC + HLRR_CO+HLRR_Imp_Appr+HLRR_Imp_Sub),0,0,0));
                    if(NICKEL_FC!=0 || NICKEL_CO!=0)pricesimul.add(new SBPSimWrapper('Nickel',NICKEL_CO,NICKEL_Imp_Appr,NICKEL_Imp_Sub,NICKEL_FC,(NICKEL_FC + NICKEL_CO +NICKEL_Imp_Appr+ NICKEL_Imp_Sub),0,0,0));
                    if(ALUMINUM_FC!=0 || ALUMINUM_CO!=0)pricesimul.add(new SBPSimWrapper('Aluminium',ALUMINUM_CO,ALUMINUM_Imp_Appr,ALUMINUM_Imp_Sub,ALUMINUM_FC,(ALUMINUM_FC + ALUMINUM_CO + ALUMINUM_Imp_Appr+ALUMINUM_Imp_Sub),0,0,0));
                    if(MOLYBDENUM_FC!=0 || MOLYBDENUM_CO!=0)pricesimul.add(new SBPSimWrapper('Molybdenum',MOLYBDENUM_CO,MOLYBDENUM_Imp_Appr,MOLYBDENUM_Imp_Sub,MOLYBDENUM_FC,(MOLYBDENUM_FC + MOLYBDENUM_CO + MOLYBDENUM_Imp_Appr+MOLYBDENUM_Imp_Sub),0,0,0));
                    if(OTH_METALS_FC!=0 || OTH_METALS_CO!=0)pricesimul.add(new SBPSimWrapper('Other metals',OTH_METALS_CO,OTH_METALS_Imp_Appr,OTH_METALS_Imp_Sub,OTH_METALS_FC,(OTH_METALS_FC + OTH_METALS_CO + OTH_METALS_Imp_Appr+OTH_METALS_Imp_Sub),0,0,0));
                    if(ENG_CHANGES_FC!=0 || ENG_CHANGES_CO!=0)pricesimul.add(new SBPSimWrapper('Eng. Changes',ENG_CHANGES_CO,ENG_CHANGES_Imp_Appr,ENG_CHANGES_Imp_Sub,ENG_CHANGES_FC,(ENG_CHANGES_FC + ENG_CHANGES_CO + ENG_CHANGES_Imp_Appr+ENG_CHANGES_Imp_Sub),0,0,0));
                    if(FX_FC!=0 || FX_CO!=0)pricesimul.add(new SBPSimWrapper('FX',FX_CO,0,0,FX_FC,(FX_FC + FX_CO),0,0,0));
                    if(ENDTOOLAMOR_FC!=0 || ENDTOOLAMOR_CO!=0)pricesimul.add(new SBPSimWrapper('End of Tooling amortization',ENDTOOLAMOR_CO,0,0,ENDTOOLAMOR_FC,(ENDTOOLAMOR_FC + ENDTOOLAMOR_CO),0,0,0));
                    if(ENDRD_EAMOR_FC!=0 || ENDRD_EAMOR_CO!=0)pricesimul.add(new SBPSimWrapper('End of RD&E amortization',ENDRD_EAMOR_CO,0,0,ENDRD_EAMOR_FC,(ENDRD_EAMOR_FC + ENDRD_EAMOR_CO),0,0,0));
                    if(INTERESTRDE_TOOLAMO_FC!=0 || INTERESTRDE_TOOLAMO_CO!=0)pricesimul.add(new SBPSimWrapper('Interest on RD&E & tooling amort.',INTERESTRDE_TOOLAMO_CO,0,0,INTERESTRDE_TOOLAMO_FC,(INTERESTRDE_TOOLAMO_FC + INTERESTRDE_TOOLAMO_CO),0,0,0));
                    if(LOGISTIC_PACKAGING_FC!=0 || LOGISTIC_PACKAGING_CO!=0)pricesimul.add(new SBPSimWrapper('Logistic/Packaging',LOGISTIC_PACKAGING_CO,0,0,LOGISTIC_PACKAGING_FC,(LOGISTIC_PACKAGING_FC + LOGISTIC_PACKAGING_CO),0,0,0));
                    if(OTHER_FC!=0 || OTHER_CO!=0)pricesimul.add(new SBPSimWrapper('Other',OTHER_CO,0,0,OTHER_FC,(OTHER_FC + OTHER_CO),0,0,0));
                    
                }
             }   
            else {
            
                message2 = 'Should Be Price is empty';
            }
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }
        
        return pricesimul;           
    
    }

    public List<SBPSimDetWrapper> getsbp_simulation_details_py(){
    
       //system.debug('%%%%%%%%%%%%% getsbp_simulation_details: ' + sp_id);
        //system.debug('%%%%%%%%%%%%% DEBUG ID single: ' + ApexPages.currentPage().getParameters().get('sp_id'));
        
        //initialization
        pricesimuldet = new List<SBPSimDetWrapper>();
        
        message2 = '';
        Integer i=0;
        
        try {
            
            if(sp_id != null){
            
                List<OEM_SBPP_Ext_Data__c> sbpListVol = [Select Id, Name, First_Day__c,Month__c, Year__c, Month_Numeric__c, CreatedDate, 
                                                         PURE_PRICE_CONTRACTUAL_String__c,  PURE_PRICE_BIZ_WINS_String__c,  HLRR_String__c,
                                                         NICKEL_String__c,ALUMINUM_String__c,   MOLYBDENUM_String__c,OTHER_METALS_String__c,
                                                         ENG_CHANGES_String__c, FX_String__c,   ENDTOOLAMOR_String__c,ENDRD_EAMOR_String__c,
                                                         INTERESTRDE_TOOLAMO_String__c, LOGISTIC_PACKAGING_String__c,OTHER_String__c,
                                                         PURE_PRICE_CONTRACTUAL_SimReq__c,  PURE_PRICE_BIZ_WINS_SimReq__c,  HLRR_SimReq__c,
                                                         NICKEL_SimReq__c,ALUMINUM_SimReq__c,   MOLYBDENUM_SimReq__c,OTH_METALS_SimReq__c,
                                                         ENG_CHANGES_SimReq__c, FX_SimReq__c,   ENDTOOLAMOR_SimReq__c,ENDRD_EAMOR_SimReq__c,
                                                         INTERESTRDE_TOOLAMO_SimReq__c, LOGISTIC_PACKAGING_SimReq__c,OTHER_SimReq__c,
                                                         ALUMINUM_x_VOLUME__c,BIZ_WINS_x_VOLUME__c, ENDRD_EAMOR_x_VOLUME__c,ENDTOOLAMOR_x_VOLUME__c,
                                                         ENG_CHANGES_x_VOLUME__c,   FX_x_VOLUME__c, HLRR_x_VOLUME__c,INTERESTRDE_TOOLAMO_x_VOLUME__c,
                                                         LOGISTIC_PACKAGING_x_VOLUME__c,    MOLYBDENUM_x_VOLUME__c, NICKEL_x_VOLUME__c, OTHER_x_VOLUME__c,
                                                         OTH_METALS_x_VOLUME__c,PURE_PRICE_x_VOLUME__c,Volume__c,CurrencyIsoCode                                                      
                                                         from OEM_SBPP_Ext_Data__c Where Sales_Plan__c = :sp_id and isAOP__c=False and Year__c =:prev_year
                                                         ORDER BY Name,Month_Numeric__c ASC];
                                                      
                //system.debug ('sbpListVol ' + sbpListVol );
                
                if(!sbpListVol.isEmpty()){ 
                
                    currency_value=sbpListVol[i].CurrencyIsoCode;
                    
                    Decimal VolAnnual=0;
                    Decimal TotImpactyearly=0;
                    
                    VolAnnual= sbpListVol[i].Volume__c + sbpListVol[i+1].Volume__c + sbpListVol[i+2].Volume__c + sbpListVol[i+3].Volume__c +  sbpListVol[i+4].Volume__c + sbpListVol[i+5].Volume__c + sbpListVol[i+6].Volume__c + sbpListVol[i+7].Volume__c + sbpListVol[i+8].Volume__c + sbpListVol[i+9].Volume__c + sbpListVol[i+10].Volume__c + sbpListVol[i+11].Volume__c;
                    
                    pricesimuldet.add(new SBPSimDetWrapper('SP','SP Qty',VolAnnual,
                                                           sbpListVol[i].Volume__c, sbpListVol[i+1].Volume__c, sbpListVol[i+2].Volume__c,
                                                           sbpListVol[i+3].Volume__c, sbpListVol[i+4].Volume__c, sbpListVol[i+5].Volume__c,
                                                           sbpListVol[i+6].Volume__c, sbpListVol[i+7].Volume__c, sbpListVol[i+8].Volume__c,
                                                           sbpListVol[i+9].Volume__c, sbpListVol[i+10].Volume__c, sbpListVol[i+11].Volume__c));
                    
                    
                    TotImpactyearly= sbpListVol[i].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+1].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+2].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+3].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+4].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+5].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+6].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+7].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+8].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+9].PURE_PRICE_CONTRACTUAL_SimReq__c +sbpListVol[i+10].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+11].PURE_PRICE_CONTRACTUAL_SimReq__c ;
                     
                    if (TotImpactyearly!=0){    
                    pricesimuldet.add(new SBPSimDetWrapper('Pure Price Contractual','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                    pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+1].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+2].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+4].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+5].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+7].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+8].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+10].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+11].PURE_PRICE_CONTRACTUAL_SimReq__c));
                    pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+1].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+2].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+4].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+5].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+7].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+8].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+10].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+11].PURE_PRICE_CONTRACTUAL_SimReq__c));
                     
                    }
                                       
                    TotImpactyearly= sbpListVol[i].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+1].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+2].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+3].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+4].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+5].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+6].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+7].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+8].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+9].PURE_PRICE_BIZ_WINS_SimReq__c +sbpListVol[i+10].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+11].PURE_PRICE_BIZ_WINS_SimReq__c ;   
                    
                    if (TotImpactyearly!=0){    
                    pricesimuldet.add(new SBPSimDetWrapper('Pure Price Biz Win','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                    pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+1].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+2].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+4].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+5].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+7].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+8].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+10].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+11].PURE_PRICE_BIZ_WINS_SimReq__c));
                    pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+1].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+2].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+4].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+5].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+7].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+8].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+10].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+11].PURE_PRICE_BIZ_WINS_SimReq__c));
                     
                    }
                    
                   TotImpactyearly= sbpListVol[i].HLRR_SimReq__c + sbpListVol[i+1].HLRR_SimReq__c + sbpListVol[i+2].HLRR_SimReq__c + sbpListVol[i+3].HLRR_SimReq__c + sbpListVol[i+4].HLRR_SimReq__c + sbpListVol[i+5].HLRR_SimReq__c + sbpListVol[i+6].HLRR_SimReq__c + sbpListVol[i+7].HLRR_SimReq__c + sbpListVol[i+8].HLRR_SimReq__c + sbpListVol[i+9].HLRR_SimReq__c +sbpListVol[i+10].HLRR_SimReq__c + sbpListVol[i+11].HLRR_SimReq__c ;     
                   
                   if (TotImpactyearly!=0){  
                   pricesimuldet.add(new SBPSimDetWrapper('VE/HLRR PT','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                   pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].HLRR_SimReq__c, sbpListVol[i+1].HLRR_SimReq__c, sbpListVol[i+2].HLRR_SimReq__c,
                                                               sbpListVol[i+3].HLRR_SimReq__c, sbpListVol[i+4].HLRR_SimReq__c, sbpListVol[i+5].HLRR_SimReq__c,
                                                               sbpListVol[i+6].HLRR_SimReq__c, sbpListVol[i+7].HLRR_SimReq__c, sbpListVol[i+8].HLRR_SimReq__c,
                                                               sbpListVol[i+9].HLRR_SimReq__c, sbpListVol[i+10].HLRR_SimReq__c, sbpListVol[i+11].HLRR_SimReq__c));
                   pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].HLRR_SimReq__c, sbpListVol[i+1].HLRR_SimReq__c, sbpListVol[i+2].HLRR_SimReq__c,
                                                               sbpListVol[i+3].HLRR_SimReq__c, sbpListVol[i+4].HLRR_SimReq__c, sbpListVol[i+5].HLRR_SimReq__c,
                                                               sbpListVol[i+6].HLRR_SimReq__c, sbpListVol[i+7].HLRR_SimReq__c, sbpListVol[i+8].HLRR_SimReq__c,
                                                               sbpListVol[i+9].HLRR_SimReq__c, sbpListVol[i+10].HLRR_SimReq__c, sbpListVol[i+11].HLRR_SimReq__c));
                   }
                     
                   TotImpactyearly= sbpListVol[i].NICKEL_SimReq__c + sbpListVol[i+1].NICKEL_SimReq__c + sbpListVol[i+2].NICKEL_SimReq__c + sbpListVol[i+3].NICKEL_SimReq__c + sbpListVol[i+4].NICKEL_SimReq__c + sbpListVol[i+5].NICKEL_SimReq__c + sbpListVol[i+6].NICKEL_SimReq__c + sbpListVol[i+7].NICKEL_SimReq__c + sbpListVol[i+8].NICKEL_SimReq__c + sbpListVol[i+9].NICKEL_SimReq__c +sbpListVol[i+10].NICKEL_SimReq__c + sbpListVol[i+11].NICKEL_SimReq__c ;     
                   
                   if (TotImpactyearly!=0){
                   pricesimuldet.add(new SBPSimDetWrapper('Nickel','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                   pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].NICKEL_SimReq__c, sbpListVol[i+1].NICKEL_SimReq__c, sbpListVol[i+2].NICKEL_SimReq__c,
                                                               sbpListVol[i+3].NICKEL_SimReq__c, sbpListVol[i+4].NICKEL_SimReq__c, sbpListVol[i+5].NICKEL_SimReq__c,
                                                               sbpListVol[i+6].NICKEL_SimReq__c, sbpListVol[i+7].NICKEL_SimReq__c, sbpListVol[i+8].NICKEL_SimReq__c,
                                                               sbpListVol[i+9].NICKEL_SimReq__c, sbpListVol[i+10].NICKEL_SimReq__c, sbpListVol[i+11].NICKEL_SimReq__c));
                   pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].NICKEL_SimReq__c, sbpListVol[i+1].NICKEL_SimReq__c, sbpListVol[i+2].NICKEL_SimReq__c,
                                                               sbpListVol[i+3].NICKEL_SimReq__c, sbpListVol[i+4].NICKEL_SimReq__c, sbpListVol[i+5].NICKEL_SimReq__c,
                                                               sbpListVol[i+6].NICKEL_SimReq__c, sbpListVol[i+7].NICKEL_SimReq__c, sbpListVol[i+8].NICKEL_SimReq__c,
                                                               sbpListVol[i+9].NICKEL_SimReq__c, sbpListVol[i+10].NICKEL_SimReq__c, sbpListVol[i+11].NICKEL_SimReq__c));
                   }
 
                     TotImpactyearly= sbpListVol[i].ALUMINUM_SimReq__c + sbpListVol[i+1].ALUMINUM_SimReq__c + sbpListVol[i+2].ALUMINUM_SimReq__c + sbpListVol[i+3].ALUMINUM_SimReq__c + sbpListVol[i+4].ALUMINUM_SimReq__c + sbpListVol[i+5].ALUMINUM_SimReq__c + sbpListVol[i+6].ALUMINUM_SimReq__c + sbpListVol[i+7].ALUMINUM_SimReq__c + sbpListVol[i+8].ALUMINUM_SimReq__c + sbpListVol[i+9].ALUMINUM_SimReq__c +sbpListVol[i+10].ALUMINUM_SimReq__c + sbpListVol[i+11].ALUMINUM_SimReq__c ;     
                   
                   if (TotImpactyearly!=0){     
                     pricesimuldet.add(new SBPSimDetWrapper('Aluminium','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ALUMINUM_SimReq__c, sbpListVol[i+1].ALUMINUM_SimReq__c, sbpListVol[i+2].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+3].ALUMINUM_SimReq__c, sbpListVol[i+4].ALUMINUM_SimReq__c, sbpListVol[i+5].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+6].ALUMINUM_SimReq__c, sbpListVol[i+7].ALUMINUM_SimReq__c, sbpListVol[i+8].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+9].ALUMINUM_SimReq__c, sbpListVol[i+10].ALUMINUM_SimReq__c, sbpListVol[i+11].ALUMINUM_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ALUMINUM_SimReq__c, sbpListVol[i+1].ALUMINUM_SimReq__c, sbpListVol[i+2].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+3].ALUMINUM_SimReq__c, sbpListVol[i+4].ALUMINUM_SimReq__c, sbpListVol[i+5].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+6].ALUMINUM_SimReq__c, sbpListVol[i+7].ALUMINUM_SimReq__c, sbpListVol[i+8].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+9].ALUMINUM_SimReq__c, sbpListVol[i+10].ALUMINUM_SimReq__c, sbpListVol[i+11].ALUMINUM_SimReq__c));
                    } 
                     
                     TotImpactyearly= sbpListVol[i].MOLYBDENUM_SimReq__c + sbpListVol[i+1].MOLYBDENUM_SimReq__c + sbpListVol[i+2].MOLYBDENUM_SimReq__c + sbpListVol[i+3].MOLYBDENUM_SimReq__c + sbpListVol[i+4].MOLYBDENUM_SimReq__c + sbpListVol[i+5].MOLYBDENUM_SimReq__c + sbpListVol[i+6].MOLYBDENUM_SimReq__c + sbpListVol[i+7].MOLYBDENUM_SimReq__c + sbpListVol[i+8].MOLYBDENUM_SimReq__c + sbpListVol[i+9].MOLYBDENUM_SimReq__c +sbpListVol[i+10].MOLYBDENUM_SimReq__c + sbpListVol[i+11].MOLYBDENUM_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('Molybdenum','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].MOLYBDENUM_SimReq__c, sbpListVol[i+1].MOLYBDENUM_SimReq__c, sbpListVol[i+2].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+3].MOLYBDENUM_SimReq__c, sbpListVol[i+4].MOLYBDENUM_SimReq__c, sbpListVol[i+5].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+6].MOLYBDENUM_SimReq__c, sbpListVol[i+7].MOLYBDENUM_SimReq__c, sbpListVol[i+8].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+9].MOLYBDENUM_SimReq__c, sbpListVol[i+10].MOLYBDENUM_SimReq__c, sbpListVol[i+11].MOLYBDENUM_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].MOLYBDENUM_SimReq__c, sbpListVol[i+1].MOLYBDENUM_SimReq__c, sbpListVol[i+2].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+3].MOLYBDENUM_SimReq__c, sbpListVol[i+4].MOLYBDENUM_SimReq__c, sbpListVol[i+5].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+6].MOLYBDENUM_SimReq__c, sbpListVol[i+7].MOLYBDENUM_SimReq__c, sbpListVol[i+8].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+9].MOLYBDENUM_SimReq__c, sbpListVol[i+10].MOLYBDENUM_SimReq__c, sbpListVol[i+11].MOLYBDENUM_SimReq__c));
                     
                     }
                     
                     TotImpactyearly= sbpListVol[i].OTH_METALS_SimReq__c + sbpListVol[i+1].OTH_METALS_SimReq__c + sbpListVol[i+2].OTH_METALS_SimReq__c + sbpListVol[i+3].OTH_METALS_SimReq__c + sbpListVol[i+4].OTH_METALS_SimReq__c + sbpListVol[i+5].OTH_METALS_SimReq__c + sbpListVol[i+6].OTH_METALS_SimReq__c + sbpListVol[i+7].OTH_METALS_SimReq__c + sbpListVol[i+8].OTH_METALS_SimReq__c + sbpListVol[i+9].OTH_METALS_SimReq__c +sbpListVol[i+10].OTH_METALS_SimReq__c + sbpListVol[i+11].OTH_METALS_SimReq__c ;     
                     if (TotImpactyearly!=0){ 
                     pricesimuldet.add(new SBPSimDetWrapper('Other metals','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].OTH_METALS_SimReq__c, sbpListVol[i+1].OTH_METALS_SimReq__c, sbpListVol[i+2].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+3].OTH_METALS_SimReq__c, sbpListVol[i+4].OTH_METALS_SimReq__c, sbpListVol[i+5].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+6].OTH_METALS_SimReq__c, sbpListVol[i+7].OTH_METALS_SimReq__c, sbpListVol[i+8].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+9].OTH_METALS_SimReq__c, sbpListVol[i+10].OTH_METALS_SimReq__c, sbpListVol[i+11].OTH_METALS_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].OTH_METALS_SimReq__c, sbpListVol[i+1].OTH_METALS_SimReq__c, sbpListVol[i+2].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+3].OTH_METALS_SimReq__c, sbpListVol[i+4].OTH_METALS_SimReq__c, sbpListVol[i+5].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+6].OTH_METALS_SimReq__c, sbpListVol[i+7].OTH_METALS_SimReq__c, sbpListVol[i+8].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+9].OTH_METALS_SimReq__c, sbpListVol[i+10].OTH_METALS_SimReq__c, sbpListVol[i+11].OTH_METALS_SimReq__c));
                     
                     }
                     
                     TotImpactyearly= sbpListVol[i].ENG_CHANGES_SimReq__c + sbpListVol[i+1].ENG_CHANGES_SimReq__c + sbpListVol[i+2].ENG_CHANGES_SimReq__c + sbpListVol[i+3].ENG_CHANGES_SimReq__c + sbpListVol[i+4].ENG_CHANGES_SimReq__c + sbpListVol[i+5].ENG_CHANGES_SimReq__c + sbpListVol[i+6].ENG_CHANGES_SimReq__c + sbpListVol[i+7].ENG_CHANGES_SimReq__c + sbpListVol[i+8].ENG_CHANGES_SimReq__c + sbpListVol[i+9].ENG_CHANGES_SimReq__c +sbpListVol[i+10].ENG_CHANGES_SimReq__c + sbpListVol[i+11].ENG_CHANGES_SimReq__c ;     
                     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('Eng. Changes','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ENG_CHANGES_SimReq__c, sbpListVol[i+1].ENG_CHANGES_SimReq__c, sbpListVol[i+2].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+3].ENG_CHANGES_SimReq__c, sbpListVol[i+4].ENG_CHANGES_SimReq__c, sbpListVol[i+5].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+6].ENG_CHANGES_SimReq__c, sbpListVol[i+7].ENG_CHANGES_SimReq__c, sbpListVol[i+8].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+9].ENG_CHANGES_SimReq__c, sbpListVol[i+10].ENG_CHANGES_SimReq__c, sbpListVol[i+11].ENG_CHANGES_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ENG_CHANGES_SimReq__c, sbpListVol[i+1].ENG_CHANGES_SimReq__c, sbpListVol[i+2].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+3].ENG_CHANGES_SimReq__c, sbpListVol[i+4].ENG_CHANGES_SimReq__c, sbpListVol[i+5].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+6].ENG_CHANGES_SimReq__c, sbpListVol[i+7].ENG_CHANGES_SimReq__c, sbpListVol[i+8].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+9].ENG_CHANGES_SimReq__c, sbpListVol[i+10].ENG_CHANGES_SimReq__c, sbpListVol[i+11].ENG_CHANGES_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].FX_SimReq__c + sbpListVol[i+1].FX_SimReq__c + sbpListVol[i+2].FX_SimReq__c + sbpListVol[i+3].FX_SimReq__c + sbpListVol[i+4].FX_SimReq__c + sbpListVol[i+5].FX_SimReq__c + sbpListVol[i+6].FX_SimReq__c + sbpListVol[i+7].FX_SimReq__c + sbpListVol[i+8].FX_SimReq__c + sbpListVol[i+9].FX_SimReq__c +sbpListVol[i+10].FX_SimReq__c + sbpListVol[i+11].FX_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('FX','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].FX_SimReq__c, sbpListVol[i+1].FX_SimReq__c, sbpListVol[i+2].FX_SimReq__c,
                                                               sbpListVol[i+3].FX_SimReq__c, sbpListVol[i+4].FX_SimReq__c, sbpListVol[i+5].FX_SimReq__c,
                                                               sbpListVol[i+6].FX_SimReq__c, sbpListVol[i+7].FX_SimReq__c, sbpListVol[i+8].FX_SimReq__c,
                                                               sbpListVol[i+9].FX_SimReq__c, sbpListVol[i+10].FX_SimReq__c, sbpListVol[i+11].FX_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].FX_SimReq__c, sbpListVol[i+1].FX_SimReq__c, sbpListVol[i+2].FX_SimReq__c,
                                                               sbpListVol[i+3].FX_SimReq__c, sbpListVol[i+4].FX_SimReq__c, sbpListVol[i+5].FX_SimReq__c,
                                                               sbpListVol[i+6].FX_SimReq__c, sbpListVol[i+7].FX_SimReq__c, sbpListVol[i+8].FX_SimReq__c,
                                                               sbpListVol[i+9].FX_SimReq__c, sbpListVol[i+10].FX_SimReq__c, sbpListVol[i+11].FX_SimReq__c));
                     
                     }
                     
                     TotImpactyearly= sbpListVol[i].ENDTOOLAMOR_SimReq__c + sbpListVol[i+1].ENDTOOLAMOR_SimReq__c + sbpListVol[i+2].ENDTOOLAMOR_SimReq__c + sbpListVol[i+3].ENDTOOLAMOR_SimReq__c + sbpListVol[i+4].ENDTOOLAMOR_SimReq__c + sbpListVol[i+5].ENDTOOLAMOR_SimReq__c + sbpListVol[i+6].ENDTOOLAMOR_SimReq__c + sbpListVol[i+7].ENDTOOLAMOR_SimReq__c + sbpListVol[i+8].ENDTOOLAMOR_SimReq__c + sbpListVol[i+9].ENDTOOLAMOR_SimReq__c +sbpListVol[i+10].ENDTOOLAMOR_SimReq__c + sbpListVol[i+11].ENDTOOLAMOR_SimReq__c ;     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('End of Tooling amortization','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ENDTOOLAMOR_SimReq__c, sbpListVol[i+1].ENDTOOLAMOR_SimReq__c, sbpListVol[i+2].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDTOOLAMOR_SimReq__c, sbpListVol[i+4].ENDTOOLAMOR_SimReq__c, sbpListVol[i+5].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDTOOLAMOR_SimReq__c, sbpListVol[i+7].ENDTOOLAMOR_SimReq__c, sbpListVol[i+8].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDTOOLAMOR_SimReq__c, sbpListVol[i+10].ENDTOOLAMOR_SimReq__c, sbpListVol[i+11].ENDTOOLAMOR_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ENDTOOLAMOR_SimReq__c, sbpListVol[i+1].ENDTOOLAMOR_SimReq__c, sbpListVol[i+2].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDTOOLAMOR_SimReq__c, sbpListVol[i+4].ENDTOOLAMOR_SimReq__c, sbpListVol[i+5].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDTOOLAMOR_SimReq__c, sbpListVol[i+7].ENDTOOLAMOR_SimReq__c, sbpListVol[i+8].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDTOOLAMOR_SimReq__c, sbpListVol[i+10].ENDTOOLAMOR_SimReq__c, sbpListVol[i+11].ENDTOOLAMOR_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].ENDRD_EAMOR_SimReq__c + sbpListVol[i+1].ENDRD_EAMOR_SimReq__c + sbpListVol[i+2].ENDRD_EAMOR_SimReq__c + sbpListVol[i+3].ENDRD_EAMOR_SimReq__c + sbpListVol[i+4].ENDRD_EAMOR_SimReq__c + sbpListVol[i+5].ENDRD_EAMOR_SimReq__c + sbpListVol[i+6].ENDRD_EAMOR_SimReq__c + sbpListVol[i+7].ENDRD_EAMOR_SimReq__c + sbpListVol[i+8].ENDRD_EAMOR_SimReq__c + sbpListVol[i+9].ENDRD_EAMOR_SimReq__c +sbpListVol[i+10].ENDRD_EAMOR_SimReq__c + sbpListVol[i+11].ENDRD_EAMOR_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('End of RD&E amortization','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ENDRD_EAMOR_SimReq__c, sbpListVol[i+1].ENDRD_EAMOR_SimReq__c, sbpListVol[i+2].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDRD_EAMOR_SimReq__c, sbpListVol[i+4].ENDRD_EAMOR_SimReq__c, sbpListVol[i+5].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDRD_EAMOR_SimReq__c, sbpListVol[i+7].ENDRD_EAMOR_SimReq__c, sbpListVol[i+8].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDRD_EAMOR_SimReq__c, sbpListVol[i+10].ENDRD_EAMOR_SimReq__c, sbpListVol[i+11].ENDRD_EAMOR_SimReq__c));
                      pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ENDRD_EAMOR_SimReq__c, sbpListVol[i+1].ENDRD_EAMOR_SimReq__c, sbpListVol[i+2].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDRD_EAMOR_SimReq__c, sbpListVol[i+4].ENDRD_EAMOR_SimReq__c, sbpListVol[i+5].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDRD_EAMOR_SimReq__c, sbpListVol[i+7].ENDRD_EAMOR_SimReq__c, sbpListVol[i+8].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDRD_EAMOR_SimReq__c, sbpListVol[i+10].ENDRD_EAMOR_SimReq__c, sbpListVol[i+11].ENDRD_EAMOR_SimReq__c));
                     }
                     
                     TotImpactyearly= sbpListVol[i].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+1].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+2].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+3].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+4].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+5].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+6].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+7].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+8].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+9].INTERESTRDE_TOOLAMO_SimReq__c +sbpListVol[i+10].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+11].INTERESTRDE_TOOLAMO_SimReq__c ;     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('Interest on RD&E & tooling amort.','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+1].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+2].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+3].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+4].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+5].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+6].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+7].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+8].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+9].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+10].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+11].INTERESTRDE_TOOLAMO_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+1].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+2].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+3].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+4].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+5].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+6].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+7].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+8].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+9].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+10].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+11].INTERESTRDE_TOOLAMO_SimReq__c));
                     }
                     
                     TotImpactyearly= sbpListVol[i].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+1].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+2].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+3].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+4].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+5].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+6].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+7].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+8].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+9].LOGISTIC_PACKAGING_SimReq__c +sbpListVol[i+10].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+11].LOGISTIC_PACKAGING_SimReq__c ;     
                     if (TotImpactyearly!=0){ 
                     pricesimuldet.add(new SBPSimDetWrapper('Logistic/Packaging','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+1].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+2].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+3].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+4].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+5].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+6].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+7].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+8].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+9].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+10].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+11].LOGISTIC_PACKAGING_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+1].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+2].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+3].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+4].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+5].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+6].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+7].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+8].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+9].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+10].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+11].LOGISTIC_PACKAGING_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].OTHER_SimReq__c + sbpListVol[i+1].OTHER_SimReq__c + sbpListVol[i+2].OTHER_SimReq__c + sbpListVol[i+3].OTHER_SimReq__c + sbpListVol[i+4].OTHER_SimReq__c + sbpListVol[i+5].OTHER_SimReq__c + sbpListVol[i+6].OTHER_SimReq__c + sbpListVol[i+7].OTHER_SimReq__c + sbpListVol[i+8].OTHER_SimReq__c + sbpListVol[i+9].OTHER_SimReq__c +sbpListVol[i+10].OTHER_SimReq__c + sbpListVol[i+11].OTHER_SimReq__c ;     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('Other','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].OTHER_SimReq__c, sbpListVol[i+1].OTHER_SimReq__c, sbpListVol[i+2].OTHER_SimReq__c,
                                                               sbpListVol[i+3].OTHER_SimReq__c, sbpListVol[i+4].OTHER_SimReq__c, sbpListVol[i+5].OTHER_SimReq__c,
                                                               sbpListVol[i+6].OTHER_SimReq__c, sbpListVol[i+7].OTHER_SimReq__c, sbpListVol[i+8].OTHER_SimReq__c,
                                                               sbpListVol[i+9].OTHER_SimReq__c, sbpListVol[i+10].OTHER_SimReq__c, sbpListVol[i+11].OTHER_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].OTHER_SimReq__c, sbpListVol[i+1].OTHER_SimReq__c, sbpListVol[i+2].OTHER_SimReq__c,
                                                               sbpListVol[i+3].OTHER_SimReq__c, sbpListVol[i+4].OTHER_SimReq__c, sbpListVol[i+5].OTHER_SimReq__c,
                                                               sbpListVol[i+6].OTHER_SimReq__c, sbpListVol[i+7].OTHER_SimReq__c, sbpListVol[i+8].OTHER_SimReq__c,
                                                               sbpListVol[i+9].OTHER_SimReq__c, sbpListVol[i+10].OTHER_SimReq__c, sbpListVol[i+11].OTHER_SimReq__c));
                     }
                    //system.debug ('pricesimuldet ' + pricesimuldet);
                
                }
            
            }
            else {
            
                message2 = 'Id Not Found, please try again your search';
            }
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }
       
        return pricesimuldet;
            
    
    }
    
    public List<SBPSimDetWrapper> getsbp_simulation_details(){
    
       //system.debug('%%%%%%%%%%%%% getsbp_simulation_details: ' + sp_id);
        //system.debug('%%%%%%%%%%%%% DEBUG ID single: ' + ApexPages.currentPage().getParameters().get('sp_id'));
        
        //initialization
        pricesimuldet = new List<SBPSimDetWrapper>();
        
        message2 = '';
        Integer i=0;
        
        try {
            
            if(sp_id != null){
            
                List<OEM_SBPP_Ext_Data__c> sbpListVol = [Select Id, Name, First_Day__c,Month__c, Year__c, Month_Numeric__c, CreatedDate, 
                                                         PURE_PRICE_CONTRACTUAL_String__c,  PURE_PRICE_BIZ_WINS_String__c,  HLRR_String__c,
                                                         NICKEL_String__c,ALUMINUM_String__c,   MOLYBDENUM_String__c,OTHER_METALS_String__c,
                                                         ENG_CHANGES_String__c, FX_String__c,   ENDTOOLAMOR_String__c,ENDRD_EAMOR_String__c,
                                                         INTERESTRDE_TOOLAMO_String__c, LOGISTIC_PACKAGING_String__c,OTHER_String__c,
                                                         PURE_PRICE_CONTRACTUAL_SimReq__c,  PURE_PRICE_BIZ_WINS_SimReq__c,  HLRR_SimReq__c,
                                                         NICKEL_SimReq__c,ALUMINUM_SimReq__c,   MOLYBDENUM_SimReq__c,OTH_METALS_SimReq__c,
                                                         ENG_CHANGES_SimReq__c, FX_SimReq__c,   ENDTOOLAMOR_SimReq__c,ENDRD_EAMOR_SimReq__c,
                                                         INTERESTRDE_TOOLAMO_SimReq__c, LOGISTIC_PACKAGING_SimReq__c,OTHER_SimReq__c,
                                                         ALUMINUM_x_VOLUME__c,BIZ_WINS_x_VOLUME__c, ENDRD_EAMOR_x_VOLUME__c,ENDTOOLAMOR_x_VOLUME__c,
                                                         ENG_CHANGES_x_VOLUME__c,   FX_x_VOLUME__c, HLRR_x_VOLUME__c,INTERESTRDE_TOOLAMO_x_VOLUME__c,
                                                         LOGISTIC_PACKAGING_x_VOLUME__c,    MOLYBDENUM_x_VOLUME__c, NICKEL_x_VOLUME__c, OTHER_x_VOLUME__c,
                                                         OTH_METALS_x_VOLUME__c,PURE_PRICE_x_VOLUME__c,Volume__c,CurrencyIsoCode                                                      
                                                         from OEM_SBPP_Ext_Data__c Where Sales_Plan__c = :sp_id and isAOP__c=False and Year__c =:current_year
                                                         ORDER BY Name,Month_Numeric__c ASC];
                                                      
                //system.debug ('sbpListVol ' + sbpListVol );
                
                if(!sbpListVol.isEmpty()){ 
                
                    currency_value=sbpListVol[i].CurrencyIsoCode;
                    
                    Decimal VolAnnual=0;
                    Decimal TotImpactyearly=0;
                    
                    VolAnnual= sbpListVol[i].Volume__c + sbpListVol[i+1].Volume__c + sbpListVol[i+2].Volume__c + sbpListVol[i+3].Volume__c +  sbpListVol[i+4].Volume__c + sbpListVol[i+5].Volume__c + sbpListVol[i+6].Volume__c + sbpListVol[i+7].Volume__c + sbpListVol[i+8].Volume__c + sbpListVol[i+9].Volume__c + sbpListVol[i+10].Volume__c + sbpListVol[i+11].Volume__c;
                    
                    pricesimuldet.add(new SBPSimDetWrapper('SP','SP Qty',VolAnnual,
                                                           sbpListVol[i].Volume__c, sbpListVol[i+1].Volume__c, sbpListVol[i+2].Volume__c,
                                                           sbpListVol[i+3].Volume__c, sbpListVol[i+4].Volume__c, sbpListVol[i+5].Volume__c,
                                                           sbpListVol[i+6].Volume__c, sbpListVol[i+7].Volume__c, sbpListVol[i+8].Volume__c,
                                                           sbpListVol[i+9].Volume__c, sbpListVol[i+10].Volume__c, sbpListVol[i+11].Volume__c));
                    
                    
                    TotImpactyearly= sbpListVol[i].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+1].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+2].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+3].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+4].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+5].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+6].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+7].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+8].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+9].PURE_PRICE_CONTRACTUAL_SimReq__c +sbpListVol[i+10].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+11].PURE_PRICE_CONTRACTUAL_SimReq__c ;
                     
                    if (TotImpactyearly!=0){    
                    pricesimuldet.add(new SBPSimDetWrapper('Pure Price Contractual','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                    pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+1].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+2].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+4].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+5].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+7].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+8].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+10].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+11].PURE_PRICE_CONTRACTUAL_SimReq__c));
                    pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+1].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+2].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+4].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+5].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+7].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+8].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+10].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+11].PURE_PRICE_CONTRACTUAL_SimReq__c));
                     
                    }
                                       
                    TotImpactyearly= sbpListVol[i].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+1].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+2].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+3].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+4].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+5].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+6].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+7].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+8].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+9].PURE_PRICE_BIZ_WINS_SimReq__c +sbpListVol[i+10].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+11].PURE_PRICE_BIZ_WINS_SimReq__c ;   
                    
                    if (TotImpactyearly!=0){    
                    pricesimuldet.add(new SBPSimDetWrapper('Pure Price Biz Win','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                    pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+1].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+2].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+4].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+5].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+7].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+8].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+10].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+11].PURE_PRICE_BIZ_WINS_SimReq__c));
                    pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+1].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+2].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+4].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+5].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+7].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+8].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+10].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+11].PURE_PRICE_BIZ_WINS_SimReq__c));
                     
                    }
                    
                   TotImpactyearly= sbpListVol[i].HLRR_SimReq__c + sbpListVol[i+1].HLRR_SimReq__c + sbpListVol[i+2].HLRR_SimReq__c + sbpListVol[i+3].HLRR_SimReq__c + sbpListVol[i+4].HLRR_SimReq__c + sbpListVol[i+5].HLRR_SimReq__c + sbpListVol[i+6].HLRR_SimReq__c + sbpListVol[i+7].HLRR_SimReq__c + sbpListVol[i+8].HLRR_SimReq__c + sbpListVol[i+9].HLRR_SimReq__c +sbpListVol[i+10].HLRR_SimReq__c + sbpListVol[i+11].HLRR_SimReq__c ;     
                   
                   if (TotImpactyearly!=0){  
                   pricesimuldet.add(new SBPSimDetWrapper('VE/HLRR PT','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                   pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].HLRR_SimReq__c, sbpListVol[i+1].HLRR_SimReq__c, sbpListVol[i+2].HLRR_SimReq__c,
                                                               sbpListVol[i+3].HLRR_SimReq__c, sbpListVol[i+4].HLRR_SimReq__c, sbpListVol[i+5].HLRR_SimReq__c,
                                                               sbpListVol[i+6].HLRR_SimReq__c, sbpListVol[i+7].HLRR_SimReq__c, sbpListVol[i+8].HLRR_SimReq__c,
                                                               sbpListVol[i+9].HLRR_SimReq__c, sbpListVol[i+10].HLRR_SimReq__c, sbpListVol[i+11].HLRR_SimReq__c));
                   pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].HLRR_SimReq__c, sbpListVol[i+1].HLRR_SimReq__c, sbpListVol[i+2].HLRR_SimReq__c,
                                                               sbpListVol[i+3].HLRR_SimReq__c, sbpListVol[i+4].HLRR_SimReq__c, sbpListVol[i+5].HLRR_SimReq__c,
                                                               sbpListVol[i+6].HLRR_SimReq__c, sbpListVol[i+7].HLRR_SimReq__c, sbpListVol[i+8].HLRR_SimReq__c,
                                                               sbpListVol[i+9].HLRR_SimReq__c, sbpListVol[i+10].HLRR_SimReq__c, sbpListVol[i+11].HLRR_SimReq__c));
                   }
                     
                   TotImpactyearly= sbpListVol[i].NICKEL_SimReq__c + sbpListVol[i+1].NICKEL_SimReq__c + sbpListVol[i+2].NICKEL_SimReq__c + sbpListVol[i+3].NICKEL_SimReq__c + sbpListVol[i+4].NICKEL_SimReq__c + sbpListVol[i+5].NICKEL_SimReq__c + sbpListVol[i+6].NICKEL_SimReq__c + sbpListVol[i+7].NICKEL_SimReq__c + sbpListVol[i+8].NICKEL_SimReq__c + sbpListVol[i+9].NICKEL_SimReq__c +sbpListVol[i+10].NICKEL_SimReq__c + sbpListVol[i+11].NICKEL_SimReq__c ;     
                   
                   if (TotImpactyearly!=0){
                   pricesimuldet.add(new SBPSimDetWrapper('Nickel','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                   pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].NICKEL_SimReq__c, sbpListVol[i+1].NICKEL_SimReq__c, sbpListVol[i+2].NICKEL_SimReq__c,
                                                               sbpListVol[i+3].NICKEL_SimReq__c, sbpListVol[i+4].NICKEL_SimReq__c, sbpListVol[i+5].NICKEL_SimReq__c,
                                                               sbpListVol[i+6].NICKEL_SimReq__c, sbpListVol[i+7].NICKEL_SimReq__c, sbpListVol[i+8].NICKEL_SimReq__c,
                                                               sbpListVol[i+9].NICKEL_SimReq__c, sbpListVol[i+10].NICKEL_SimReq__c, sbpListVol[i+11].NICKEL_SimReq__c));
                   pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].NICKEL_SimReq__c, sbpListVol[i+1].NICKEL_SimReq__c, sbpListVol[i+2].NICKEL_SimReq__c,
                                                               sbpListVol[i+3].NICKEL_SimReq__c, sbpListVol[i+4].NICKEL_SimReq__c, sbpListVol[i+5].NICKEL_SimReq__c,
                                                               sbpListVol[i+6].NICKEL_SimReq__c, sbpListVol[i+7].NICKEL_SimReq__c, sbpListVol[i+8].NICKEL_SimReq__c,
                                                               sbpListVol[i+9].NICKEL_SimReq__c, sbpListVol[i+10].NICKEL_SimReq__c, sbpListVol[i+11].NICKEL_SimReq__c));
                   }
 
                     TotImpactyearly= sbpListVol[i].ALUMINUM_SimReq__c + sbpListVol[i+1].ALUMINUM_SimReq__c + sbpListVol[i+2].ALUMINUM_SimReq__c + sbpListVol[i+3].ALUMINUM_SimReq__c + sbpListVol[i+4].ALUMINUM_SimReq__c + sbpListVol[i+5].ALUMINUM_SimReq__c + sbpListVol[i+6].ALUMINUM_SimReq__c + sbpListVol[i+7].ALUMINUM_SimReq__c + sbpListVol[i+8].ALUMINUM_SimReq__c + sbpListVol[i+9].ALUMINUM_SimReq__c +sbpListVol[i+10].ALUMINUM_SimReq__c + sbpListVol[i+11].ALUMINUM_SimReq__c ;     
                   
                   if (TotImpactyearly!=0){     
                     pricesimuldet.add(new SBPSimDetWrapper('Aluminium','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ALUMINUM_SimReq__c, sbpListVol[i+1].ALUMINUM_SimReq__c, sbpListVol[i+2].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+3].ALUMINUM_SimReq__c, sbpListVol[i+4].ALUMINUM_SimReq__c, sbpListVol[i+5].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+6].ALUMINUM_SimReq__c, sbpListVol[i+7].ALUMINUM_SimReq__c, sbpListVol[i+8].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+9].ALUMINUM_SimReq__c, sbpListVol[i+10].ALUMINUM_SimReq__c, sbpListVol[i+11].ALUMINUM_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ALUMINUM_SimReq__c, sbpListVol[i+1].ALUMINUM_SimReq__c, sbpListVol[i+2].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+3].ALUMINUM_SimReq__c, sbpListVol[i+4].ALUMINUM_SimReq__c, sbpListVol[i+5].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+6].ALUMINUM_SimReq__c, sbpListVol[i+7].ALUMINUM_SimReq__c, sbpListVol[i+8].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+9].ALUMINUM_SimReq__c, sbpListVol[i+10].ALUMINUM_SimReq__c, sbpListVol[i+11].ALUMINUM_SimReq__c));
                    } 
                     
                     TotImpactyearly= sbpListVol[i].MOLYBDENUM_SimReq__c + sbpListVol[i+1].MOLYBDENUM_SimReq__c + sbpListVol[i+2].MOLYBDENUM_SimReq__c + sbpListVol[i+3].MOLYBDENUM_SimReq__c + sbpListVol[i+4].MOLYBDENUM_SimReq__c + sbpListVol[i+5].MOLYBDENUM_SimReq__c + sbpListVol[i+6].MOLYBDENUM_SimReq__c + sbpListVol[i+7].MOLYBDENUM_SimReq__c + sbpListVol[i+8].MOLYBDENUM_SimReq__c + sbpListVol[i+9].MOLYBDENUM_SimReq__c +sbpListVol[i+10].MOLYBDENUM_SimReq__c + sbpListVol[i+11].MOLYBDENUM_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('Molybdenum','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].MOLYBDENUM_SimReq__c, sbpListVol[i+1].MOLYBDENUM_SimReq__c, sbpListVol[i+2].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+3].MOLYBDENUM_SimReq__c, sbpListVol[i+4].MOLYBDENUM_SimReq__c, sbpListVol[i+5].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+6].MOLYBDENUM_SimReq__c, sbpListVol[i+7].MOLYBDENUM_SimReq__c, sbpListVol[i+8].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+9].MOLYBDENUM_SimReq__c, sbpListVol[i+10].MOLYBDENUM_SimReq__c, sbpListVol[i+11].MOLYBDENUM_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].MOLYBDENUM_SimReq__c, sbpListVol[i+1].MOLYBDENUM_SimReq__c, sbpListVol[i+2].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+3].MOLYBDENUM_SimReq__c, sbpListVol[i+4].MOLYBDENUM_SimReq__c, sbpListVol[i+5].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+6].MOLYBDENUM_SimReq__c, sbpListVol[i+7].MOLYBDENUM_SimReq__c, sbpListVol[i+8].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+9].MOLYBDENUM_SimReq__c, sbpListVol[i+10].MOLYBDENUM_SimReq__c, sbpListVol[i+11].MOLYBDENUM_SimReq__c));
                     
                     }
                     
                     TotImpactyearly= sbpListVol[i].OTH_METALS_SimReq__c + sbpListVol[i+1].OTH_METALS_SimReq__c + sbpListVol[i+2].OTH_METALS_SimReq__c + sbpListVol[i+3].OTH_METALS_SimReq__c + sbpListVol[i+4].OTH_METALS_SimReq__c + sbpListVol[i+5].OTH_METALS_SimReq__c + sbpListVol[i+6].OTH_METALS_SimReq__c + sbpListVol[i+7].OTH_METALS_SimReq__c + sbpListVol[i+8].OTH_METALS_SimReq__c + sbpListVol[i+9].OTH_METALS_SimReq__c +sbpListVol[i+10].OTH_METALS_SimReq__c + sbpListVol[i+11].OTH_METALS_SimReq__c ;     
                     if (TotImpactyearly!=0){ 
                     pricesimuldet.add(new SBPSimDetWrapper('Other metals','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].OTH_METALS_SimReq__c, sbpListVol[i+1].OTH_METALS_SimReq__c, sbpListVol[i+2].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+3].OTH_METALS_SimReq__c, sbpListVol[i+4].OTH_METALS_SimReq__c, sbpListVol[i+5].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+6].OTH_METALS_SimReq__c, sbpListVol[i+7].OTH_METALS_SimReq__c, sbpListVol[i+8].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+9].OTH_METALS_SimReq__c, sbpListVol[i+10].OTH_METALS_SimReq__c, sbpListVol[i+11].OTH_METALS_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].OTH_METALS_SimReq__c, sbpListVol[i+1].OTH_METALS_SimReq__c, sbpListVol[i+2].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+3].OTH_METALS_SimReq__c, sbpListVol[i+4].OTH_METALS_SimReq__c, sbpListVol[i+5].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+6].OTH_METALS_SimReq__c, sbpListVol[i+7].OTH_METALS_SimReq__c, sbpListVol[i+8].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+9].OTH_METALS_SimReq__c, sbpListVol[i+10].OTH_METALS_SimReq__c, sbpListVol[i+11].OTH_METALS_SimReq__c));
                     
                     }
                     
                     TotImpactyearly= sbpListVol[i].ENG_CHANGES_SimReq__c + sbpListVol[i+1].ENG_CHANGES_SimReq__c + sbpListVol[i+2].ENG_CHANGES_SimReq__c + sbpListVol[i+3].ENG_CHANGES_SimReq__c + sbpListVol[i+4].ENG_CHANGES_SimReq__c + sbpListVol[i+5].ENG_CHANGES_SimReq__c + sbpListVol[i+6].ENG_CHANGES_SimReq__c + sbpListVol[i+7].ENG_CHANGES_SimReq__c + sbpListVol[i+8].ENG_CHANGES_SimReq__c + sbpListVol[i+9].ENG_CHANGES_SimReq__c +sbpListVol[i+10].ENG_CHANGES_SimReq__c + sbpListVol[i+11].ENG_CHANGES_SimReq__c ;     
                     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('Eng. Changes','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ENG_CHANGES_SimReq__c, sbpListVol[i+1].ENG_CHANGES_SimReq__c, sbpListVol[i+2].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+3].ENG_CHANGES_SimReq__c, sbpListVol[i+4].ENG_CHANGES_SimReq__c, sbpListVol[i+5].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+6].ENG_CHANGES_SimReq__c, sbpListVol[i+7].ENG_CHANGES_SimReq__c, sbpListVol[i+8].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+9].ENG_CHANGES_SimReq__c, sbpListVol[i+10].ENG_CHANGES_SimReq__c, sbpListVol[i+11].ENG_CHANGES_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ENG_CHANGES_SimReq__c, sbpListVol[i+1].ENG_CHANGES_SimReq__c, sbpListVol[i+2].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+3].ENG_CHANGES_SimReq__c, sbpListVol[i+4].ENG_CHANGES_SimReq__c, sbpListVol[i+5].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+6].ENG_CHANGES_SimReq__c, sbpListVol[i+7].ENG_CHANGES_SimReq__c, sbpListVol[i+8].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+9].ENG_CHANGES_SimReq__c, sbpListVol[i+10].ENG_CHANGES_SimReq__c, sbpListVol[i+11].ENG_CHANGES_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].FX_SimReq__c + sbpListVol[i+1].FX_SimReq__c + sbpListVol[i+2].FX_SimReq__c + sbpListVol[i+3].FX_SimReq__c + sbpListVol[i+4].FX_SimReq__c + sbpListVol[i+5].FX_SimReq__c + sbpListVol[i+6].FX_SimReq__c + sbpListVol[i+7].FX_SimReq__c + sbpListVol[i+8].FX_SimReq__c + sbpListVol[i+9].FX_SimReq__c +sbpListVol[i+10].FX_SimReq__c + sbpListVol[i+11].FX_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('FX','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].FX_SimReq__c, sbpListVol[i+1].FX_SimReq__c, sbpListVol[i+2].FX_SimReq__c,
                                                               sbpListVol[i+3].FX_SimReq__c, sbpListVol[i+4].FX_SimReq__c, sbpListVol[i+5].FX_SimReq__c,
                                                               sbpListVol[i+6].FX_SimReq__c, sbpListVol[i+7].FX_SimReq__c, sbpListVol[i+8].FX_SimReq__c,
                                                               sbpListVol[i+9].FX_SimReq__c, sbpListVol[i+10].FX_SimReq__c, sbpListVol[i+11].FX_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].FX_SimReq__c, sbpListVol[i+1].FX_SimReq__c, sbpListVol[i+2].FX_SimReq__c,
                                                               sbpListVol[i+3].FX_SimReq__c, sbpListVol[i+4].FX_SimReq__c, sbpListVol[i+5].FX_SimReq__c,
                                                               sbpListVol[i+6].FX_SimReq__c, sbpListVol[i+7].FX_SimReq__c, sbpListVol[i+8].FX_SimReq__c,
                                                               sbpListVol[i+9].FX_SimReq__c, sbpListVol[i+10].FX_SimReq__c, sbpListVol[i+11].FX_SimReq__c));
                     
                     }
                     
                     TotImpactyearly= sbpListVol[i].ENDTOOLAMOR_SimReq__c + sbpListVol[i+1].ENDTOOLAMOR_SimReq__c + sbpListVol[i+2].ENDTOOLAMOR_SimReq__c + sbpListVol[i+3].ENDTOOLAMOR_SimReq__c + sbpListVol[i+4].ENDTOOLAMOR_SimReq__c + sbpListVol[i+5].ENDTOOLAMOR_SimReq__c + sbpListVol[i+6].ENDTOOLAMOR_SimReq__c + sbpListVol[i+7].ENDTOOLAMOR_SimReq__c + sbpListVol[i+8].ENDTOOLAMOR_SimReq__c + sbpListVol[i+9].ENDTOOLAMOR_SimReq__c +sbpListVol[i+10].ENDTOOLAMOR_SimReq__c + sbpListVol[i+11].ENDTOOLAMOR_SimReq__c ;     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('End of Tooling amortization','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ENDTOOLAMOR_SimReq__c, sbpListVol[i+1].ENDTOOLAMOR_SimReq__c, sbpListVol[i+2].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDTOOLAMOR_SimReq__c, sbpListVol[i+4].ENDTOOLAMOR_SimReq__c, sbpListVol[i+5].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDTOOLAMOR_SimReq__c, sbpListVol[i+7].ENDTOOLAMOR_SimReq__c, sbpListVol[i+8].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDTOOLAMOR_SimReq__c, sbpListVol[i+10].ENDTOOLAMOR_SimReq__c, sbpListVol[i+11].ENDTOOLAMOR_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ENDTOOLAMOR_SimReq__c, sbpListVol[i+1].ENDTOOLAMOR_SimReq__c, sbpListVol[i+2].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDTOOLAMOR_SimReq__c, sbpListVol[i+4].ENDTOOLAMOR_SimReq__c, sbpListVol[i+5].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDTOOLAMOR_SimReq__c, sbpListVol[i+7].ENDTOOLAMOR_SimReq__c, sbpListVol[i+8].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDTOOLAMOR_SimReq__c, sbpListVol[i+10].ENDTOOLAMOR_SimReq__c, sbpListVol[i+11].ENDTOOLAMOR_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].ENDRD_EAMOR_SimReq__c + sbpListVol[i+1].ENDRD_EAMOR_SimReq__c + sbpListVol[i+2].ENDRD_EAMOR_SimReq__c + sbpListVol[i+3].ENDRD_EAMOR_SimReq__c + sbpListVol[i+4].ENDRD_EAMOR_SimReq__c + sbpListVol[i+5].ENDRD_EAMOR_SimReq__c + sbpListVol[i+6].ENDRD_EAMOR_SimReq__c + sbpListVol[i+7].ENDRD_EAMOR_SimReq__c + sbpListVol[i+8].ENDRD_EAMOR_SimReq__c + sbpListVol[i+9].ENDRD_EAMOR_SimReq__c +sbpListVol[i+10].ENDRD_EAMOR_SimReq__c + sbpListVol[i+11].ENDRD_EAMOR_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('End of RD&E amortization','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ENDRD_EAMOR_SimReq__c, sbpListVol[i+1].ENDRD_EAMOR_SimReq__c, sbpListVol[i+2].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDRD_EAMOR_SimReq__c, sbpListVol[i+4].ENDRD_EAMOR_SimReq__c, sbpListVol[i+5].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDRD_EAMOR_SimReq__c, sbpListVol[i+7].ENDRD_EAMOR_SimReq__c, sbpListVol[i+8].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDRD_EAMOR_SimReq__c, sbpListVol[i+10].ENDRD_EAMOR_SimReq__c, sbpListVol[i+11].ENDRD_EAMOR_SimReq__c));
                      pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ENDRD_EAMOR_SimReq__c, sbpListVol[i+1].ENDRD_EAMOR_SimReq__c, sbpListVol[i+2].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDRD_EAMOR_SimReq__c, sbpListVol[i+4].ENDRD_EAMOR_SimReq__c, sbpListVol[i+5].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDRD_EAMOR_SimReq__c, sbpListVol[i+7].ENDRD_EAMOR_SimReq__c, sbpListVol[i+8].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDRD_EAMOR_SimReq__c, sbpListVol[i+10].ENDRD_EAMOR_SimReq__c, sbpListVol[i+11].ENDRD_EAMOR_SimReq__c));
                     }
                     
                     TotImpactyearly= sbpListVol[i].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+1].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+2].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+3].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+4].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+5].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+6].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+7].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+8].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+9].INTERESTRDE_TOOLAMO_SimReq__c +sbpListVol[i+10].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+11].INTERESTRDE_TOOLAMO_SimReq__c ;     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('Interest on RD&E & tooling amort.','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+1].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+2].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+3].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+4].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+5].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+6].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+7].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+8].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+9].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+10].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+11].INTERESTRDE_TOOLAMO_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+1].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+2].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+3].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+4].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+5].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+6].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+7].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+8].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+9].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+10].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+11].INTERESTRDE_TOOLAMO_SimReq__c));
                     }
                     
                     TotImpactyearly= sbpListVol[i].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+1].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+2].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+3].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+4].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+5].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+6].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+7].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+8].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+9].LOGISTIC_PACKAGING_SimReq__c +sbpListVol[i+10].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+11].LOGISTIC_PACKAGING_SimReq__c ;     
                     if (TotImpactyearly!=0){ 
                     pricesimuldet.add(new SBPSimDetWrapper('Logistic/Packaging','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+1].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+2].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+3].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+4].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+5].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+6].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+7].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+8].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+9].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+10].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+11].LOGISTIC_PACKAGING_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+1].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+2].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+3].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+4].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+5].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+6].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+7].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+8].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+9].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+10].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+11].LOGISTIC_PACKAGING_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].OTHER_SimReq__c + sbpListVol[i+1].OTHER_SimReq__c + sbpListVol[i+2].OTHER_SimReq__c + sbpListVol[i+3].OTHER_SimReq__c + sbpListVol[i+4].OTHER_SimReq__c + sbpListVol[i+5].OTHER_SimReq__c + sbpListVol[i+6].OTHER_SimReq__c + sbpListVol[i+7].OTHER_SimReq__c + sbpListVol[i+8].OTHER_SimReq__c + sbpListVol[i+9].OTHER_SimReq__c +sbpListVol[i+10].OTHER_SimReq__c + sbpListVol[i+11].OTHER_SimReq__c ;     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('Other','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].OTHER_SimReq__c, sbpListVol[i+1].OTHER_SimReq__c, sbpListVol[i+2].OTHER_SimReq__c,
                                                               sbpListVol[i+3].OTHER_SimReq__c, sbpListVol[i+4].OTHER_SimReq__c, sbpListVol[i+5].OTHER_SimReq__c,
                                                               sbpListVol[i+6].OTHER_SimReq__c, sbpListVol[i+7].OTHER_SimReq__c, sbpListVol[i+8].OTHER_SimReq__c,
                                                               sbpListVol[i+9].OTHER_SimReq__c, sbpListVol[i+10].OTHER_SimReq__c, sbpListVol[i+11].OTHER_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].OTHER_SimReq__c, sbpListVol[i+1].OTHER_SimReq__c, sbpListVol[i+2].OTHER_SimReq__c,
                                                               sbpListVol[i+3].OTHER_SimReq__c, sbpListVol[i+4].OTHER_SimReq__c, sbpListVol[i+5].OTHER_SimReq__c,
                                                               sbpListVol[i+6].OTHER_SimReq__c, sbpListVol[i+7].OTHER_SimReq__c, sbpListVol[i+8].OTHER_SimReq__c,
                                                               sbpListVol[i+9].OTHER_SimReq__c, sbpListVol[i+10].OTHER_SimReq__c, sbpListVol[i+11].OTHER_SimReq__c));
                     }
                    //system.debug ('pricesimuldet ' + pricesimuldet);
                
                }
            
            }
            else {
            
                message2 = 'Id Not Found, please try again your search';
            }
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }
        
        return pricesimuldet;
            
    
    }
    
    public List<SBPSimDetWrapper> getsbp_simulation_details_ny(){
    
       //system.debug('%%%%%%%%%%%%% getsbp_simulation_details: ' + sp_id);
        //system.debug('%%%%%%%%%%%%% DEBUG ID single: ' + ApexPages.currentPage().getParameters().get('sp_id'));
        
        //initialization
        pricesimuldet = new List<SBPSimDetWrapper>();
        
        message2 = '';
        Integer i=0;
        
        try {
            
            if(sp_id != null){
            
                List<OEM_SBPP_Ext_Data__c> sbpListVol = [Select Id, Name, First_Day__c,Month__c, Year__c, Month_Numeric__c, CreatedDate, 
                                                         PURE_PRICE_CONTRACTUAL_String__c,  PURE_PRICE_BIZ_WINS_String__c,  HLRR_String__c,
                                                         NICKEL_String__c,ALUMINUM_String__c,   MOLYBDENUM_String__c,OTHER_METALS_String__c,
                                                         ENG_CHANGES_String__c, FX_String__c,   ENDTOOLAMOR_String__c,ENDRD_EAMOR_String__c,
                                                         INTERESTRDE_TOOLAMO_String__c, LOGISTIC_PACKAGING_String__c,OTHER_String__c,
                                                         PURE_PRICE_CONTRACTUAL_SimReq__c,  PURE_PRICE_BIZ_WINS_SimReq__c,  HLRR_SimReq__c,
                                                         NICKEL_SimReq__c,ALUMINUM_SimReq__c,   MOLYBDENUM_SimReq__c,OTH_METALS_SimReq__c,
                                                         ENG_CHANGES_SimReq__c, FX_SimReq__c,   ENDTOOLAMOR_SimReq__c,ENDRD_EAMOR_SimReq__c,
                                                         INTERESTRDE_TOOLAMO_SimReq__c, LOGISTIC_PACKAGING_SimReq__c,OTHER_SimReq__c,
                                                         ALUMINUM_x_VOLUME__c,BIZ_WINS_x_VOLUME__c, ENDRD_EAMOR_x_VOLUME__c,ENDTOOLAMOR_x_VOLUME__c,
                                                         ENG_CHANGES_x_VOLUME__c,   FX_x_VOLUME__c, HLRR_x_VOLUME__c,INTERESTRDE_TOOLAMO_x_VOLUME__c,
                                                         LOGISTIC_PACKAGING_x_VOLUME__c,    MOLYBDENUM_x_VOLUME__c, NICKEL_x_VOLUME__c, OTHER_x_VOLUME__c,
                                                         OTH_METALS_x_VOLUME__c,PURE_PRICE_x_VOLUME__c,Volume__c,CurrencyIsoCode                                                      
                                                         from OEM_SBPP_Ext_Data__c Where Sales_Plan__c = :sp_id and isAOP__c=False and Year__c =:next_year
                                                         ORDER BY Name,Month_Numeric__c ASC];
                                                      
                //system.debug ('sbpListVol ' + sbpListVol );
                
                if(!sbpListVol.isEmpty()){ 
                
                    currency_value=sbpListVol[i].CurrencyIsoCode;
                    
                    Decimal VolAnnual=0;
                    Decimal TotImpactyearly=0;
                    
                    VolAnnual= sbpListVol[i].Volume__c + sbpListVol[i+1].Volume__c + sbpListVol[i+2].Volume__c + sbpListVol[i+3].Volume__c +  sbpListVol[i+4].Volume__c + sbpListVol[i+5].Volume__c + sbpListVol[i+6].Volume__c + sbpListVol[i+7].Volume__c + sbpListVol[i+8].Volume__c + sbpListVol[i+9].Volume__c + sbpListVol[i+10].Volume__c + sbpListVol[i+11].Volume__c;
                    
                    pricesimuldet.add(new SBPSimDetWrapper('SP','SP Qty',VolAnnual,
                                                           sbpListVol[i].Volume__c, sbpListVol[i+1].Volume__c, sbpListVol[i+2].Volume__c,
                                                           sbpListVol[i+3].Volume__c, sbpListVol[i+4].Volume__c, sbpListVol[i+5].Volume__c,
                                                           sbpListVol[i+6].Volume__c, sbpListVol[i+7].Volume__c, sbpListVol[i+8].Volume__c,
                                                           sbpListVol[i+9].Volume__c, sbpListVol[i+10].Volume__c, sbpListVol[i+11].Volume__c));
                    
                    
                    TotImpactyearly= sbpListVol[i].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+1].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+2].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+3].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+4].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+5].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+6].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+7].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+8].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+9].PURE_PRICE_CONTRACTUAL_SimReq__c +sbpListVol[i+10].PURE_PRICE_CONTRACTUAL_SimReq__c + sbpListVol[i+11].PURE_PRICE_CONTRACTUAL_SimReq__c ;
                    if (TotImpactyearly!=0){    
                    pricesimuldet.add(new SBPSimDetWrapper('Pure Price Contractual','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                    pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+1].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+2].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+4].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+5].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+7].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+8].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+10].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+11].PURE_PRICE_CONTRACTUAL_SimReq__c));
                    pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+1].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+2].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+4].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+5].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+7].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+8].PURE_PRICE_CONTRACTUAL_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+10].PURE_PRICE_CONTRACTUAL_SimReq__c, sbpListVol[i+11].PURE_PRICE_CONTRACTUAL_SimReq__c));
                    }
                                        
                    TotImpactyearly= sbpListVol[i].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+1].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+2].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+3].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+4].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+5].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+6].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+7].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+8].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+9].PURE_PRICE_BIZ_WINS_SimReq__c +sbpListVol[i+10].PURE_PRICE_BIZ_WINS_SimReq__c + sbpListVol[i+11].PURE_PRICE_BIZ_WINS_SimReq__c ;   
                    if (TotImpactyearly!=0){    
                    pricesimuldet.add(new SBPSimDetWrapper('Pure Price Biz Win','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                    pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+1].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+2].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+4].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+5].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+7].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+8].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+10].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+11].PURE_PRICE_BIZ_WINS_SimReq__c));
                    pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+1].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+2].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+3].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+4].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+5].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+6].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+7].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+8].PURE_PRICE_BIZ_WINS_SimReq__c,
                                                               sbpListVol[i+9].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+10].PURE_PRICE_BIZ_WINS_SimReq__c, sbpListVol[i+11].PURE_PRICE_BIZ_WINS_SimReq__c));
                    }
                    
                   TotImpactyearly= sbpListVol[i].HLRR_SimReq__c + sbpListVol[i+1].HLRR_SimReq__c + sbpListVol[i+2].HLRR_SimReq__c + sbpListVol[i+3].HLRR_SimReq__c + sbpListVol[i+4].HLRR_SimReq__c + sbpListVol[i+5].HLRR_SimReq__c + sbpListVol[i+6].HLRR_SimReq__c + sbpListVol[i+7].HLRR_SimReq__c + sbpListVol[i+8].HLRR_SimReq__c + sbpListVol[i+9].HLRR_SimReq__c +sbpListVol[i+10].HLRR_SimReq__c + sbpListVol[i+11].HLRR_SimReq__c ;     
                   if (TotImpactyearly!=0){     
                   pricesimuldet.add(new SBPSimDetWrapper('VE/HLRR PT','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                   pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].HLRR_SimReq__c, sbpListVol[i+1].HLRR_SimReq__c, sbpListVol[i+2].HLRR_SimReq__c,
                                                               sbpListVol[i+3].HLRR_SimReq__c, sbpListVol[i+4].HLRR_SimReq__c, sbpListVol[i+5].HLRR_SimReq__c,
                                                               sbpListVol[i+6].HLRR_SimReq__c, sbpListVol[i+7].HLRR_SimReq__c, sbpListVol[i+8].HLRR_SimReq__c,
                                                               sbpListVol[i+9].HLRR_SimReq__c, sbpListVol[i+10].HLRR_SimReq__c, sbpListVol[i+11].HLRR_SimReq__c));
                   pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].HLRR_SimReq__c, sbpListVol[i+1].HLRR_SimReq__c, sbpListVol[i+2].HLRR_SimReq__c,
                                                               sbpListVol[i+3].HLRR_SimReq__c, sbpListVol[i+4].HLRR_SimReq__c, sbpListVol[i+5].HLRR_SimReq__c,
                                                               sbpListVol[i+6].HLRR_SimReq__c, sbpListVol[i+7].HLRR_SimReq__c, sbpListVol[i+8].HLRR_SimReq__c,
                                                               sbpListVol[i+9].HLRR_SimReq__c, sbpListVol[i+10].HLRR_SimReq__c, sbpListVol[i+11].HLRR_SimReq__c));
                    } 
                     
                    TotImpactyearly= sbpListVol[i].NICKEL_SimReq__c + sbpListVol[i+1].NICKEL_SimReq__c + sbpListVol[i+2].NICKEL_SimReq__c + sbpListVol[i+3].NICKEL_SimReq__c + sbpListVol[i+4].NICKEL_SimReq__c + sbpListVol[i+5].NICKEL_SimReq__c + sbpListVol[i+6].NICKEL_SimReq__c + sbpListVol[i+7].NICKEL_SimReq__c + sbpListVol[i+8].NICKEL_SimReq__c + sbpListVol[i+9].NICKEL_SimReq__c +sbpListVol[i+10].NICKEL_SimReq__c + sbpListVol[i+11].NICKEL_SimReq__c ;     
                    if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('Nickel','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].NICKEL_SimReq__c, sbpListVol[i+1].NICKEL_SimReq__c, sbpListVol[i+2].NICKEL_SimReq__c,
                                                               sbpListVol[i+3].NICKEL_SimReq__c, sbpListVol[i+4].NICKEL_SimReq__c, sbpListVol[i+5].NICKEL_SimReq__c,
                                                               sbpListVol[i+6].NICKEL_SimReq__c, sbpListVol[i+7].NICKEL_SimReq__c, sbpListVol[i+8].NICKEL_SimReq__c,
                                                               sbpListVol[i+9].NICKEL_SimReq__c, sbpListVol[i+10].NICKEL_SimReq__c, sbpListVol[i+11].NICKEL_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].NICKEL_SimReq__c, sbpListVol[i+1].NICKEL_SimReq__c, sbpListVol[i+2].NICKEL_SimReq__c,
                                                               sbpListVol[i+3].NICKEL_SimReq__c, sbpListVol[i+4].NICKEL_SimReq__c, sbpListVol[i+5].NICKEL_SimReq__c,
                                                               sbpListVol[i+6].NICKEL_SimReq__c, sbpListVol[i+7].NICKEL_SimReq__c, sbpListVol[i+8].NICKEL_SimReq__c,
                                                               sbpListVol[i+9].NICKEL_SimReq__c, sbpListVol[i+10].NICKEL_SimReq__c, sbpListVol[i+11].NICKEL_SimReq__c));
                     }
 
                     TotImpactyearly= sbpListVol[i].ALUMINUM_SimReq__c + sbpListVol[i+1].ALUMINUM_SimReq__c + sbpListVol[i+2].ALUMINUM_SimReq__c + sbpListVol[i+3].ALUMINUM_SimReq__c + sbpListVol[i+4].ALUMINUM_SimReq__c + sbpListVol[i+5].ALUMINUM_SimReq__c + sbpListVol[i+6].ALUMINUM_SimReq__c + sbpListVol[i+7].ALUMINUM_SimReq__c + sbpListVol[i+8].ALUMINUM_SimReq__c + sbpListVol[i+9].ALUMINUM_SimReq__c +sbpListVol[i+10].ALUMINUM_SimReq__c + sbpListVol[i+11].ALUMINUM_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('Aluminium','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ALUMINUM_SimReq__c, sbpListVol[i+1].ALUMINUM_SimReq__c, sbpListVol[i+2].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+3].ALUMINUM_SimReq__c, sbpListVol[i+4].ALUMINUM_SimReq__c, sbpListVol[i+5].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+6].ALUMINUM_SimReq__c, sbpListVol[i+7].ALUMINUM_SimReq__c, sbpListVol[i+8].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+9].ALUMINUM_SimReq__c, sbpListVol[i+10].ALUMINUM_SimReq__c, sbpListVol[i+11].ALUMINUM_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ALUMINUM_SimReq__c, sbpListVol[i+1].ALUMINUM_SimReq__c, sbpListVol[i+2].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+3].ALUMINUM_SimReq__c, sbpListVol[i+4].ALUMINUM_SimReq__c, sbpListVol[i+5].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+6].ALUMINUM_SimReq__c, sbpListVol[i+7].ALUMINUM_SimReq__c, sbpListVol[i+8].ALUMINUM_SimReq__c,
                                                               sbpListVol[i+9].ALUMINUM_SimReq__c, sbpListVol[i+10].ALUMINUM_SimReq__c, sbpListVol[i+11].ALUMINUM_SimReq__c));
                     }
                     
                     TotImpactyearly= sbpListVol[i].MOLYBDENUM_SimReq__c + sbpListVol[i+1].MOLYBDENUM_SimReq__c + sbpListVol[i+2].MOLYBDENUM_SimReq__c + sbpListVol[i+3].MOLYBDENUM_SimReq__c + sbpListVol[i+4].MOLYBDENUM_SimReq__c + sbpListVol[i+5].MOLYBDENUM_SimReq__c + sbpListVol[i+6].MOLYBDENUM_SimReq__c + sbpListVol[i+7].MOLYBDENUM_SimReq__c + sbpListVol[i+8].MOLYBDENUM_SimReq__c + sbpListVol[i+9].MOLYBDENUM_SimReq__c +sbpListVol[i+10].MOLYBDENUM_SimReq__c + sbpListVol[i+11].MOLYBDENUM_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('Molybdenum','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].MOLYBDENUM_SimReq__c, sbpListVol[i+1].MOLYBDENUM_SimReq__c, sbpListVol[i+2].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+3].MOLYBDENUM_SimReq__c, sbpListVol[i+4].MOLYBDENUM_SimReq__c, sbpListVol[i+5].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+6].MOLYBDENUM_SimReq__c, sbpListVol[i+7].MOLYBDENUM_SimReq__c, sbpListVol[i+8].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+9].MOLYBDENUM_SimReq__c, sbpListVol[i+10].MOLYBDENUM_SimReq__c, sbpListVol[i+11].MOLYBDENUM_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].MOLYBDENUM_SimReq__c, sbpListVol[i+1].MOLYBDENUM_SimReq__c, sbpListVol[i+2].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+3].MOLYBDENUM_SimReq__c, sbpListVol[i+4].MOLYBDENUM_SimReq__c, sbpListVol[i+5].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+6].MOLYBDENUM_SimReq__c, sbpListVol[i+7].MOLYBDENUM_SimReq__c, sbpListVol[i+8].MOLYBDENUM_SimReq__c,
                                                               sbpListVol[i+9].MOLYBDENUM_SimReq__c, sbpListVol[i+10].MOLYBDENUM_SimReq__c, sbpListVol[i+11].MOLYBDENUM_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].OTH_METALS_SimReq__c + sbpListVol[i+1].OTH_METALS_SimReq__c + sbpListVol[i+2].OTH_METALS_SimReq__c + sbpListVol[i+3].OTH_METALS_SimReq__c + sbpListVol[i+4].OTH_METALS_SimReq__c + sbpListVol[i+5].OTH_METALS_SimReq__c + sbpListVol[i+6].OTH_METALS_SimReq__c + sbpListVol[i+7].OTH_METALS_SimReq__c + sbpListVol[i+8].OTH_METALS_SimReq__c + sbpListVol[i+9].OTH_METALS_SimReq__c +sbpListVol[i+10].OTH_METALS_SimReq__c + sbpListVol[i+11].OTH_METALS_SimReq__c ;     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('Other metals','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].OTH_METALS_SimReq__c, sbpListVol[i+1].OTH_METALS_SimReq__c, sbpListVol[i+2].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+3].OTH_METALS_SimReq__c, sbpListVol[i+4].OTH_METALS_SimReq__c, sbpListVol[i+5].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+6].OTH_METALS_SimReq__c, sbpListVol[i+7].OTH_METALS_SimReq__c, sbpListVol[i+8].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+9].OTH_METALS_SimReq__c, sbpListVol[i+10].OTH_METALS_SimReq__c, sbpListVol[i+11].OTH_METALS_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].OTH_METALS_SimReq__c, sbpListVol[i+1].OTH_METALS_SimReq__c, sbpListVol[i+2].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+3].OTH_METALS_SimReq__c, sbpListVol[i+4].OTH_METALS_SimReq__c, sbpListVol[i+5].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+6].OTH_METALS_SimReq__c, sbpListVol[i+7].OTH_METALS_SimReq__c, sbpListVol[i+8].OTH_METALS_SimReq__c,
                                                               sbpListVol[i+9].OTH_METALS_SimReq__c, sbpListVol[i+10].OTH_METALS_SimReq__c, sbpListVol[i+11].OTH_METALS_SimReq__c));
                     }
                     
                     TotImpactyearly= sbpListVol[i].ENG_CHANGES_SimReq__c + sbpListVol[i+1].ENG_CHANGES_SimReq__c + sbpListVol[i+2].ENG_CHANGES_SimReq__c + sbpListVol[i+3].ENG_CHANGES_SimReq__c + sbpListVol[i+4].ENG_CHANGES_SimReq__c + sbpListVol[i+5].ENG_CHANGES_SimReq__c + sbpListVol[i+6].ENG_CHANGES_SimReq__c + sbpListVol[i+7].ENG_CHANGES_SimReq__c + sbpListVol[i+8].ENG_CHANGES_SimReq__c + sbpListVol[i+9].ENG_CHANGES_SimReq__c +sbpListVol[i+10].ENG_CHANGES_SimReq__c + sbpListVol[i+11].ENG_CHANGES_SimReq__c ;     
                     if (TotImpactyearly!=0){
                     pricesimuldet.add(new SBPSimDetWrapper('Eng. Changes','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ENG_CHANGES_SimReq__c, sbpListVol[i+1].ENG_CHANGES_SimReq__c, sbpListVol[i+2].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+3].ENG_CHANGES_SimReq__c, sbpListVol[i+4].ENG_CHANGES_SimReq__c, sbpListVol[i+5].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+6].ENG_CHANGES_SimReq__c, sbpListVol[i+7].ENG_CHANGES_SimReq__c, sbpListVol[i+8].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+9].ENG_CHANGES_SimReq__c, sbpListVol[i+10].ENG_CHANGES_SimReq__c, sbpListVol[i+11].ENG_CHANGES_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ENG_CHANGES_SimReq__c, sbpListVol[i+1].ENG_CHANGES_SimReq__c, sbpListVol[i+2].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+3].ENG_CHANGES_SimReq__c, sbpListVol[i+4].ENG_CHANGES_SimReq__c, sbpListVol[i+5].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+6].ENG_CHANGES_SimReq__c, sbpListVol[i+7].ENG_CHANGES_SimReq__c, sbpListVol[i+8].ENG_CHANGES_SimReq__c,
                                                               sbpListVol[i+9].ENG_CHANGES_SimReq__c, sbpListVol[i+10].ENG_CHANGES_SimReq__c, sbpListVol[i+11].ENG_CHANGES_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].FX_SimReq__c + sbpListVol[i+1].FX_SimReq__c + sbpListVol[i+2].FX_SimReq__c + sbpListVol[i+3].FX_SimReq__c + sbpListVol[i+4].FX_SimReq__c + sbpListVol[i+5].FX_SimReq__c + sbpListVol[i+6].FX_SimReq__c + sbpListVol[i+7].FX_SimReq__c + sbpListVol[i+8].FX_SimReq__c + sbpListVol[i+9].FX_SimReq__c +sbpListVol[i+10].FX_SimReq__c + sbpListVol[i+11].FX_SimReq__c ;     
                     if (TotImpactyearly!=0){  
                     pricesimuldet.add(new SBPSimDetWrapper('FX','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].FX_SimReq__c, sbpListVol[i+1].FX_SimReq__c, sbpListVol[i+2].FX_SimReq__c,
                                                               sbpListVol[i+3].FX_SimReq__c, sbpListVol[i+4].FX_SimReq__c, sbpListVol[i+5].FX_SimReq__c,
                                                               sbpListVol[i+6].FX_SimReq__c, sbpListVol[i+7].FX_SimReq__c, sbpListVol[i+8].FX_SimReq__c,
                                                               sbpListVol[i+9].FX_SimReq__c, sbpListVol[i+10].FX_SimReq__c, sbpListVol[i+11].FX_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].FX_SimReq__c, sbpListVol[i+1].FX_SimReq__c, sbpListVol[i+2].FX_SimReq__c,
                                                               sbpListVol[i+3].FX_SimReq__c, sbpListVol[i+4].FX_SimReq__c, sbpListVol[i+5].FX_SimReq__c,
                                                               sbpListVol[i+6].FX_SimReq__c, sbpListVol[i+7].FX_SimReq__c, sbpListVol[i+8].FX_SimReq__c,
                                                               sbpListVol[i+9].FX_SimReq__c, sbpListVol[i+10].FX_SimReq__c, sbpListVol[i+11].FX_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].ENDTOOLAMOR_SimReq__c + sbpListVol[i+1].ENDTOOLAMOR_SimReq__c + sbpListVol[i+2].ENDTOOLAMOR_SimReq__c + sbpListVol[i+3].ENDTOOLAMOR_SimReq__c + sbpListVol[i+4].ENDTOOLAMOR_SimReq__c + sbpListVol[i+5].ENDTOOLAMOR_SimReq__c + sbpListVol[i+6].ENDTOOLAMOR_SimReq__c + sbpListVol[i+7].ENDTOOLAMOR_SimReq__c + sbpListVol[i+8].ENDTOOLAMOR_SimReq__c + sbpListVol[i+9].ENDTOOLAMOR_SimReq__c +sbpListVol[i+10].ENDTOOLAMOR_SimReq__c + sbpListVol[i+11].ENDTOOLAMOR_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('End of Tooling amortization','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ENDTOOLAMOR_SimReq__c, sbpListVol[i+1].ENDTOOLAMOR_SimReq__c, sbpListVol[i+2].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDTOOLAMOR_SimReq__c, sbpListVol[i+4].ENDTOOLAMOR_SimReq__c, sbpListVol[i+5].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDTOOLAMOR_SimReq__c, sbpListVol[i+7].ENDTOOLAMOR_SimReq__c, sbpListVol[i+8].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDTOOLAMOR_SimReq__c, sbpListVol[i+10].ENDTOOLAMOR_SimReq__c, sbpListVol[i+11].ENDTOOLAMOR_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ENDTOOLAMOR_SimReq__c, sbpListVol[i+1].ENDTOOLAMOR_SimReq__c, sbpListVol[i+2].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDTOOLAMOR_SimReq__c, sbpListVol[i+4].ENDTOOLAMOR_SimReq__c, sbpListVol[i+5].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDTOOLAMOR_SimReq__c, sbpListVol[i+7].ENDTOOLAMOR_SimReq__c, sbpListVol[i+8].ENDTOOLAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDTOOLAMOR_SimReq__c, sbpListVol[i+10].ENDTOOLAMOR_SimReq__c, sbpListVol[i+11].ENDTOOLAMOR_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].ENDRD_EAMOR_SimReq__c + sbpListVol[i+1].ENDRD_EAMOR_SimReq__c + sbpListVol[i+2].ENDRD_EAMOR_SimReq__c + sbpListVol[i+3].ENDRD_EAMOR_SimReq__c + sbpListVol[i+4].ENDRD_EAMOR_SimReq__c + sbpListVol[i+5].ENDRD_EAMOR_SimReq__c + sbpListVol[i+6].ENDRD_EAMOR_SimReq__c + sbpListVol[i+7].ENDRD_EAMOR_SimReq__c + sbpListVol[i+8].ENDRD_EAMOR_SimReq__c + sbpListVol[i+9].ENDRD_EAMOR_SimReq__c +sbpListVol[i+10].ENDRD_EAMOR_SimReq__c + sbpListVol[i+11].ENDRD_EAMOR_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('End of RD&E amortization','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].ENDRD_EAMOR_SimReq__c, sbpListVol[i+1].ENDRD_EAMOR_SimReq__c, sbpListVol[i+2].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDRD_EAMOR_SimReq__c, sbpListVol[i+4].ENDRD_EAMOR_SimReq__c, sbpListVol[i+5].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDRD_EAMOR_SimReq__c, sbpListVol[i+7].ENDRD_EAMOR_SimReq__c, sbpListVol[i+8].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDRD_EAMOR_SimReq__c, sbpListVol[i+10].ENDRD_EAMOR_SimReq__c, sbpListVol[i+11].ENDRD_EAMOR_SimReq__c));
                      pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].ENDRD_EAMOR_SimReq__c, sbpListVol[i+1].ENDRD_EAMOR_SimReq__c, sbpListVol[i+2].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+3].ENDRD_EAMOR_SimReq__c, sbpListVol[i+4].ENDRD_EAMOR_SimReq__c, sbpListVol[i+5].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+6].ENDRD_EAMOR_SimReq__c, sbpListVol[i+7].ENDRD_EAMOR_SimReq__c, sbpListVol[i+8].ENDRD_EAMOR_SimReq__c,
                                                               sbpListVol[i+9].ENDRD_EAMOR_SimReq__c, sbpListVol[i+10].ENDRD_EAMOR_SimReq__c, sbpListVol[i+11].ENDRD_EAMOR_SimReq__c));
                     }
                     TotImpactyearly= sbpListVol[i].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+1].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+2].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+3].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+4].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+5].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+6].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+7].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+8].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+9].INTERESTRDE_TOOLAMO_SimReq__c +sbpListVol[i+10].INTERESTRDE_TOOLAMO_SimReq__c + sbpListVol[i+11].INTERESTRDE_TOOLAMO_SimReq__c ;     
                     if (TotImpactyearly!=0){  
                     pricesimuldet.add(new SBPSimDetWrapper('Interest on RD&E & tooling amort.','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+1].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+2].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+3].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+4].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+5].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+6].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+7].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+8].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+9].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+10].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+11].INTERESTRDE_TOOLAMO_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+1].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+2].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+3].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+4].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+5].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+6].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+7].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+8].INTERESTRDE_TOOLAMO_SimReq__c,
                                                               sbpListVol[i+9].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+10].INTERESTRDE_TOOLAMO_SimReq__c, sbpListVol[i+11].INTERESTRDE_TOOLAMO_SimReq__c));
                     }
                     
                     TotImpactyearly= sbpListVol[i].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+1].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+2].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+3].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+4].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+5].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+6].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+7].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+8].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+9].LOGISTIC_PACKAGING_SimReq__c +sbpListVol[i+10].LOGISTIC_PACKAGING_SimReq__c + sbpListVol[i+11].LOGISTIC_PACKAGING_SimReq__c ;     
                     if (TotImpactyearly!=0){  
                     pricesimuldet.add(new SBPSimDetWrapper('Logistic/Packaging','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+1].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+2].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+3].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+4].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+5].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+6].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+7].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+8].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+9].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+10].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+11].LOGISTIC_PACKAGING_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+1].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+2].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+3].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+4].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+5].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+6].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+7].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+8].LOGISTIC_PACKAGING_SimReq__c,
                                                               sbpListVol[i+9].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+10].LOGISTIC_PACKAGING_SimReq__c, sbpListVol[i+11].LOGISTIC_PACKAGING_SimReq__c));
                     }
                     
                     
                     TotImpactyearly= sbpListVol[i].OTHER_SimReq__c + sbpListVol[i+1].OTHER_SimReq__c + sbpListVol[i+2].OTHER_SimReq__c + sbpListVol[i+3].OTHER_SimReq__c + sbpListVol[i+4].OTHER_SimReq__c + sbpListVol[i+5].OTHER_SimReq__c + sbpListVol[i+6].OTHER_SimReq__c + sbpListVol[i+7].OTHER_SimReq__c + sbpListVol[i+8].OTHER_SimReq__c + sbpListVol[i+9].OTHER_SimReq__c +sbpListVol[i+10].OTHER_SimReq__c + sbpListVol[i+11].OTHER_SimReq__c ;     
                     if (TotImpactyearly!=0){   
                     pricesimuldet.add(new SBPSimDetWrapper('Other','Current',0,0,0,0,0,0,0,0,0,0,0,0,0));
                     pricesimuldet.add(new SBPSimDetWrapper('','New Req',TotImpactyearly,
                                                               sbpListVol[i].OTHER_SimReq__c, sbpListVol[i+1].OTHER_SimReq__c, sbpListVol[i+2].OTHER_SimReq__c,
                                                               sbpListVol[i+3].OTHER_SimReq__c, sbpListVol[i+4].OTHER_SimReq__c, sbpListVol[i+5].OTHER_SimReq__c,
                                                               sbpListVol[i+6].OTHER_SimReq__c, sbpListVol[i+7].OTHER_SimReq__c, sbpListVol[i+8].OTHER_SimReq__c,
                                                               sbpListVol[i+9].OTHER_SimReq__c, sbpListVol[i+10].OTHER_SimReq__c, sbpListVol[i+11].OTHER_SimReq__c));
                     pricesimuldet.add(new SBPSimDetWrapper('','Total',TotImpactyearly,
                                                               sbpListVol[i].OTHER_SimReq__c, sbpListVol[i+1].OTHER_SimReq__c, sbpListVol[i+2].OTHER_SimReq__c,
                                                               sbpListVol[i+3].OTHER_SimReq__c, sbpListVol[i+4].OTHER_SimReq__c, sbpListVol[i+5].OTHER_SimReq__c,
                                                               sbpListVol[i+6].OTHER_SimReq__c, sbpListVol[i+7].OTHER_SimReq__c, sbpListVol[i+8].OTHER_SimReq__c,
                                                               sbpListVol[i+9].OTHER_SimReq__c, sbpListVol[i+10].OTHER_SimReq__c, sbpListVol[i+11].OTHER_SimReq__c));
                     }
                    //system.debug ('pricesimuldet ' + pricesimuldet);
                
                }
            
            }
            else {
            
                message2 = 'Id Not Found, please try again your search';
            }
            
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }
        
        return pricesimuldet;
            
    
    }
    
    public void TransposetoWrapper(){
    
        Integer i=0;
    
        if(!sbp_single.isEmpty()){
        
            system.debug ('TransposetoWrapper - sbp_single ' + sbp_single);
            
            sbp_tran_single = new List<SBPListWrapper>();
            
            SBPListWrapper obj1= new SBPListWrapper();
            
            obj1.varPrice_RC = 'Effective Date';
            obj1.varM1Y0 = string.valueof(sbp_single[i].First_Day__c);
            obj1.varM2Y0 = string.valueof(sbp_single[i+1].First_Day__c);
            obj1.varM3Y0 = string.valueof(sbp_single[i+2].First_Day__c);
            obj1.varM4Y0 = string.valueof(sbp_single[i+3].First_Day__c);
            obj1.varM5Y0 = string.valueof(sbp_single[i+4].First_Day__c);
            obj1.varM6Y0 = string.valueof(sbp_single[i+5].First_Day__c);
            obj1.varM7Y0 = string.valueof(sbp_single[i+6].First_Day__c);
            obj1.varM8Y0 = string.valueof(sbp_single[i+7].First_Day__c);
            obj1.varM9Y0 = string.valueof(sbp_single[i+8].First_Day__c);
            obj1.varM10Y0 = string.valueof(sbp_single[i+9].First_Day__c);
            obj1.varM11Y0 = string.valueof(sbp_single[i+10].First_Day__c);
            obj1.varM12Y0 = string.valueof(sbp_single[i+11].First_Day__c);
            obj1.varM1Y1 = string.valueof(sbp_single[i+12].First_Day__c);
            obj1.varM2Y1 = string.valueof(sbp_single[i+13].First_Day__c);
            obj1.varM3Y1 = string.valueof(sbp_single[i+14].First_Day__c);
            obj1.varM4Y1 = string.valueof(sbp_single[i+15].First_Day__c);
            obj1.varM5Y1 = string.valueof(sbp_single[i+16].First_Day__c);
            obj1.varM6Y1 = string.valueof(sbp_single[i+17].First_Day__c);
            obj1.varM7Y1 = string.valueof(sbp_single[i+18].First_Day__c);
            obj1.varM8Y1 = string.valueof(sbp_single[i+19].First_Day__c);
            obj1.varM9Y1 = string.valueof(sbp_single[i+20].First_Day__c);
            obj1.varM10Y1 = string.valueof(sbp_single[i+21].First_Day__c);
            obj1.varM11Y1 = string.valueof(sbp_single[i+22].First_Day__c);
            obj1.varM12Y1 = string.valueof(sbp_single[i+23].First_Day__c);
            obj1.varM1Y2 = string.valueof(sbp_single[i+24].First_Day__c);
            obj1.varM2Y2 = string.valueof(sbp_single[i+25].First_Day__c);
            obj1.varM3Y2 = string.valueof(sbp_single[i+26].First_Day__c);
            obj1.varM4Y2 = string.valueof(sbp_single[i+27].First_Day__c);
            obj1.varM5Y2 = string.valueof(sbp_single[i+28].First_Day__c);
            obj1.varM6Y2 = string.valueof(sbp_single[i+29].First_Day__c);
            obj1.varM7Y2 = string.valueof(sbp_single[i+30].First_Day__c);
            obj1.varM8Y2 = string.valueof(sbp_single[i+31].First_Day__c);
            obj1.varM9Y2 = string.valueof(sbp_single[i+32].First_Day__c);
            obj1.varM10Y2 = string.valueof(sbp_single[i+33].First_Day__c);
            obj1.varM11Y2 = string.valueof(sbp_single[i+34].First_Day__c);
            obj1.varM12Y2 = string.valueof(sbp_single[i+35].First_Day__c);       
            
            sbp_tran_single.add(obj1);
            
            if(islumpSum==false){
            SBPListWrapper obj2= new SBPListWrapper();
            
            obj2.varPrice_RC = 'AOP Sales Price';
            obj2.varM1Y0 = '0.00';
            obj2.varM2Y0 = '0.00';
            obj2.varM3Y0 = '0.00';
            obj2.varM4Y0 = '0.00';
            obj2.varM5Y0 = '0.00';
            obj2.varM6Y0 = '0.00';
            obj2.varM7Y0 = '0.00';
            obj2.varM8Y0 = '0.00';
            obj2.varM9Y0 = '0.00';
            obj2.varM10Y0 = '0.00';
            obj2.varM11Y0 = '0.00';
            obj2.varM12Y0 = '0.00';
            obj2.varM1Y1 = '0.00';
            obj2.varM2Y1 = '0.00';
            obj2.varM3Y1 = '0.00';
            obj2.varM4Y1 = '0.00';
            obj2.varM5Y1 = '0.00';
            obj2.varM6Y1 = '0.00';
            obj2.varM7Y1 = '0.00';
            obj2.varM8Y1 = '0.00';
            obj2.varM9Y1 = '0.00';
            obj2.varM10Y1 = '0.00';
            obj2.varM11Y1 = '0.00';
            obj2.varM12Y1 = '0.00';
            obj2.varM1Y2 = '0.00';
            obj2.varM2Y2 = '0.00';
            obj2.varM3Y2 = '0.00';
            obj2.varM4Y2 = '0.00';
            obj2.varM5Y2 = '0.00';
            obj2.varM6Y2 = '0.00';
            obj2.varM7Y2 = '0.00';
            obj2.varM8Y2 = '0.00';
            obj2.varM9Y2 = '0.00';
            obj2.varM10Y2 = '0.00';
            obj2.varM11Y2 = '0.00';
            obj2.varM12Y2 = '0.00';
            
            sbp_tran_single.add(obj2);}
            
            if(islumpSum==false){
            
            SBPListWrapper obj3= new SBPListWrapper();
            
            /*obj3.varPrice_RC = 'SAP Price';
            obj3.varM1Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i].SAP_Price__c).setscale(4));
            obj3.varM2Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+1].SAP_Price__c).setscale(4));
            obj3.varM3Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+2].SAP_Price__c).setscale(4));
            obj3.varM4Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+3].SAP_Price__c).setscale(4));
            obj3.varM5Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+4].SAP_Price__c).setscale(4));
            obj3.varM6Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+5].SAP_Price__c).setscale(4));
            obj3.varM7Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+6].SAP_Price__c).setscale(4));
            obj3.varM8Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+7].SAP_Price__c).setscale(4));
            obj3.varM9Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+8].SAP_Price__c).setscale(4));
            obj3.varM10Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+9].SAP_Price__c).setscale(4));
            obj3.varM11Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+10].SAP_Price__c).setscale(4));
            obj3.varM12Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+11].SAP_Price__c).setscale(4));
            obj3.varM1Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+12].SAP_Price__c).setscale(4));
            obj3.varM2Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+13].SAP_Price__c).setscale(4));
            obj3.varM3Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+14].SAP_Price__c).setscale(4));
            obj3.varM4Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+15].SAP_Price__c).setscale(4));
            obj3.varM5Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+16].SAP_Price__c).setscale(4));
            obj3.varM6Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+17].SAP_Price__c).setscale(4));
            obj3.varM7Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+18].SAP_Price__c).setscale(4));
            obj3.varM8Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+19].SAP_Price__c).setscale(4));
            obj3.varM9Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+20].SAP_Price__c).setscale(4));
            obj3.varM10Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+21].SAP_Price__c).setscale(4));
            obj3.varM11Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+22].SAP_Price__c).setscale(4));
            obj3.varM12Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+23].SAP_Price__c).setscale(4));
            obj3.varM1Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+24].SAP_Price__c).setscale(4));
            obj3.varM2Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+25].SAP_Price__c).setscale(4));
            obj3.varM3Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+26].SAP_Price__c).setscale(4));
            obj3.varM4Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+27].SAP_Price__c).setscale(4));
            obj3.varM5Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+28].SAP_Price__c).setscale(4));
            obj3.varM6Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+29].SAP_Price__c).setscale(4));
            obj3.varM7Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+30].SAP_Price__c).setscale(4));
            obj3.varM8Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+31].SAP_Price__c).setscale(4));
            obj3.varM9Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+32].SAP_Price__c).setscale(4));
            obj3.varM10Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+33].SAP_Price__c).setscale(4));
            obj3.varM11Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+34].SAP_Price__c).setscale(4));
            obj3.varM12Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+35].SAP_Price__c).setscale(4));
            
            sbp_tran_single.add(obj3);*/}
            
            if(islumpSum==false){
            
            system.debug('Current Price sbp_single[i].Current_Price__c ' + sbp_single[i].Current_Price__c);
            SBPListWrapper obj4cp= new SBPListWrapper();
            
            obj4cp.varPrice_RC = 'Current Price';
            obj4cp.varM1Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i].Current_Price__c).setscale(4));
            obj4cp.varM2Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+1].Current_Price__c).setscale(4));
            obj4cp.varM3Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+2].Current_Price__c).setscale(4));
            obj4cp.varM4Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+3].Current_Price__c).setscale(4));
            obj4cp.varM5Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+4].Current_Price__c).setscale(4));
            obj4cp.varM6Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+5].Current_Price__c).setscale(4));
            obj4cp.varM7Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+6].Current_Price__c).setscale(4));
            obj4cp.varM8Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+7].Current_Price__c).setscale(4));
            obj4cp.varM9Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+8].Current_Price__c).setscale(4));
            obj4cp.varM10Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+9].Current_Price__c).setscale(4));
            obj4cp.varM11Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+10].Current_Price__c).setscale(4));
            obj4cp.varM12Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+11].Current_Price__c).setscale(4));
            obj4cp.varM1Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+12].Current_Price__c).setscale(4));
            obj4cp.varM2Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+13].Current_Price__c).setscale(4));
            obj4cp.varM3Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+14].Current_Price__c).setscale(4));
            obj4cp.varM4Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+15].Current_Price__c).setscale(4));
            obj4cp.varM5Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+16].Current_Price__c).setscale(4));
            obj4cp.varM6Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+17].Current_Price__c).setscale(4));
            obj4cp.varM7Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+18].Current_Price__c).setscale(4));
            obj4cp.varM8Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+19].Current_Price__c).setscale(4));
            obj4cp.varM9Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+20].Current_Price__c).setscale(4));
            obj4cp.varM10Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+21].Current_Price__c).setscale(4));
            obj4cp.varM11Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+22].Current_Price__c).setscale(4));
            obj4cp.varM12Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+23].Current_Price__c).setscale(4));
            obj4cp.varM1Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+24].Current_Price__c).setscale(4));
            obj4cp.varM2Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+25].Current_Price__c).setscale(4));
            obj4cp.varM3Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+26].Current_Price__c).setscale(4));
            obj4cp.varM4Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+27].Current_Price__c).setscale(4));
            obj4cp.varM5Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+28].Current_Price__c).setscale(4));
            obj4cp.varM6Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+29].Current_Price__c).setscale(4));
            obj4cp.varM7Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+30].Current_Price__c).setscale(4));
            obj4cp.varM8Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+31].Current_Price__c).setscale(4));
            obj4cp.varM9Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+32].Current_Price__c).setscale(4));
            obj4cp.varM10Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+33].Current_Price__c).setscale(4));
            obj4cp.varM11Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+34].Current_Price__c).setscale(4));
            obj4cp.varM12Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+35].Current_Price__c).setscale(4));
            
            sbp_tran_single.add(obj4cp);}
            
            if(islumpSum==false){
            SBPListWrapper obj4= new SBPListWrapper();
            
            obj4.varPrice_RC = 'Forecast Price';
            //system.debug('sbp_single[i].LC_Price_calcd__c ' + sbp_single[i].LC_Price_calcd__c);
            obj4.varM1Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i].LC_Price_calcd__c).setscale(4));
            obj4.varM2Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+1].LC_Price_calcd__c).setscale(4));
            obj4.varM3Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+2].LC_Price_calcd__c).setscale(4));
            obj4.varM4Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+3].LC_Price_calcd__c).setscale(4));
            obj4.varM5Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+4].LC_Price_calcd__c).setscale(4));
            obj4.varM6Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+5].LC_Price_calcd__c).setscale(4));
            obj4.varM7Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+6].LC_Price_calcd__c).setscale(4));
            obj4.varM8Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+7].LC_Price_calcd__c).setscale(4));
            obj4.varM9Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+8].LC_Price_calcd__c).setscale(4));
            obj4.varM10Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+9].LC_Price_calcd__c).setscale(4));
            obj4.varM11Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+10].LC_Price_calcd__c).setscale(4));
            obj4.varM12Y0 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+11].LC_Price_calcd__c).setscale(4));
            obj4.varM1Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+12].LC_Price_calcd__c).setscale(4));
            obj4.varM2Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+13].LC_Price_calcd__c).setscale(4));
            obj4.varM3Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+14].LC_Price_calcd__c).setscale(4));
            obj4.varM4Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+15].LC_Price_calcd__c).setscale(4));
            obj4.varM5Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+16].LC_Price_calcd__c).setscale(4));
            obj4.varM6Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+17].LC_Price_calcd__c).setscale(4));
            obj4.varM7Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+18].LC_Price_calcd__c).setscale(4));
            obj4.varM8Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+19].LC_Price_calcd__c).setscale(4));
            obj4.varM9Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+20].LC_Price_calcd__c).setscale(4));
            obj4.varM10Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+21].LC_Price_calcd__c).setscale(4));
            obj4.varM11Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+22].LC_Price_calcd__c).setscale(4));
            obj4.varM12Y1 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+23].LC_Price_calcd__c).setscale(4));
            obj4.varM1Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+24].LC_Price_calcd__c).setscale(4));
            obj4.varM2Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+25].LC_Price_calcd__c).setscale(4));
            obj4.varM3Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+26].LC_Price_calcd__c).setscale(4));
            obj4.varM4Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+27].LC_Price_calcd__c).setscale(4));
            obj4.varM5Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+28].LC_Price_calcd__c).setscale(4));
            obj4.varM6Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+29].LC_Price_calcd__c).setscale(4));
            obj4.varM7Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+30].LC_Price_calcd__c).setscale(4));
            obj4.varM8Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+31].LC_Price_calcd__c).setscale(4));
            obj4.varM9Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+32].LC_Price_calcd__c).setscale(4));
            obj4.varM10Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+33].LC_Price_calcd__c).setscale(4));
            obj4.varM11Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+34].LC_Price_calcd__c).setscale(4));
            obj4.varM12Y2 = sbp_single[i].CurrencyIsoCode + ' ' + string.valueof((sbp_single[i+35].LC_Price_calcd__c).setScale(4));
            
            sbp_tran_single.add(obj4);
            
            
            //Check on SAP Price and Should be Price
            
            Integer j=0;
            
            if(sp_month==1 && sp_year==curr_year)j=12;
            if(sp_month==2 && sp_year==curr_year)j=13;
            if(sp_month==3 && sp_year==curr_year)j=14;
            if(sp_month==4 && sp_year==curr_year)j=15;
            if(sp_month==5 && sp_year==curr_year)j=16;
            if(sp_month==6 && sp_year==curr_year)j=17;
            if(sp_month==7 && sp_year==curr_year)j=18;
            if(sp_month==8 && sp_year==curr_year)j=19;
            if(sp_month==9 && sp_year==curr_year)j=20;
            if(sp_month==10 && sp_year==curr_year)j=21;
            if(sp_month==11 && sp_year==curr_year)j=22;
            if(sp_month==12 && sp_year==curr_year)j=23;
            
            system.debug('sbp_single[j].SAP_Price__c ' + sbp_single[j].SAP_Price__c);
            system.debug('sbp_single[j].LC_Price_calcd__c ' + sbp_single[j].LC_Price_calcd__c);
            
            if((sbp_single[j].SAP_Price__c).setScale(4) != (sbp_single[j].LC_Price_calcd__c).setScale(4)){
                ischangedSAPvSBP =true;}
            else {
                ischangedSAPvSBP =false;}
            }
                        
            SBPListWrapper obj5= new SBPListWrapper();
            
            obj5.varPrice_RC = 'Pure Price Contractual';
            if (sbp_single[i].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM1Y0=''; else  obj5.varM1Y0 = sbp_single[i].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+1].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM2Y0=''; else  obj5.varM2Y0 = sbp_single[i+1].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+2].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM3Y0=''; else  obj5.varM3Y0 = sbp_single[i+2].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+3].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM4Y0=''; else  obj5.varM4Y0 = sbp_single[i+3].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+4].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM5Y0=''; else  obj5.varM5Y0 = sbp_single[i+4].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+5].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM6Y0=''; else  obj5.varM6Y0 = sbp_single[i+5].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+6].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM7Y0=''; else  obj5.varM7Y0 = sbp_single[i+6].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+7].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM8Y0=''; else  obj5.varM8Y0 = sbp_single[i+7].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+8].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM9Y0=''; else  obj5.varM9Y0 = sbp_single[i+8].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+9].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM10Y0=''; else  obj5.varM10Y0 = sbp_single[i+9].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+10].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM11Y0=''; else  obj5.varM11Y0 = sbp_single[i+10].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+11].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM12Y0=''; else  obj5.varM12Y0 = sbp_single[i+11].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+12].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM1Y1=''; else  obj5.varM1Y1 = sbp_single[i+12].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+13].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM2Y1=''; else  obj5.varM2Y1 = sbp_single[i+13].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+14].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM3Y1=''; else  obj5.varM3Y1 = sbp_single[i+14].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+15].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM4Y1=''; else  obj5.varM4Y1 = sbp_single[i+15].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+16].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM5Y1=''; else  obj5.varM5Y1 = sbp_single[i+16].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+17].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM6Y1=''; else  obj5.varM6Y1 = sbp_single[i+17].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+18].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM7Y1=''; else  obj5.varM7Y1 = sbp_single[i+18].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+19].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM8Y1=''; else  obj5.varM8Y1 = sbp_single[i+19].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+20].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM9Y1=''; else  obj5.varM9Y1 = sbp_single[i+20].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+21].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM10Y1=''; else  obj5.varM10Y1 = sbp_single[i+21].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+22].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM11Y1=''; else  obj5.varM11Y1 = sbp_single[i+22].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+23].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM12Y1=''; else  obj5.varM12Y1 = sbp_single[i+23].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+24].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM1Y2=''; else  obj5.varM1Y2 = sbp_single[i+24].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+25].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM2Y2=''; else  obj5.varM2Y2 = sbp_single[i+25].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+26].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM3Y2=''; else  obj5.varM3Y2 = sbp_single[i+26].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+27].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM4Y2=''; else  obj5.varM4Y2 = sbp_single[i+27].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+28].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM5Y2=''; else  obj5.varM5Y2 = sbp_single[i+28].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+29].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM6Y2=''; else  obj5.varM6Y2 = sbp_single[i+29].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+30].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM7Y2=''; else  obj5.varM7Y2 = sbp_single[i+30].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+31].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM8Y2=''; else  obj5.varM8Y2 = sbp_single[i+31].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+32].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM9Y2=''; else  obj5.varM9Y2 = sbp_single[i+32].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+33].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM10Y2=''; else  obj5.varM10Y2 = sbp_single[i+33].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+34].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM11Y2=''; else  obj5.varM11Y2 = sbp_single[i+34].PURE_PRICE_CONTRACTUAL_String__c;
            if (sbp_single[i+35].PURE_PRICE_CONTRACTUAL_String__c=='0.00') obj5.varM12Y2=''; else  obj5.varM12Y2 = sbp_single[i+35].PURE_PRICE_CONTRACTUAL_String__c;
            
            sbp_tran_single.add(obj5);
            
            SBPListWrapper obj6= new SBPListWrapper();
            
            obj6.varPrice_RC = 'Pure Price Biz Win';
            if (sbp_single[i].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM1Y0=''; else  obj6.varM1Y0 = sbp_single[i].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+1].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM2Y0=''; else  obj6.varM2Y0 = sbp_single[i+1].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+2].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM3Y0=''; else  obj6.varM3Y0 = sbp_single[i+2].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+3].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM4Y0=''; else  obj6.varM4Y0 = sbp_single[i+3].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+4].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM5Y0=''; else  obj6.varM5Y0 = sbp_single[i+4].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+5].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM6Y0=''; else  obj6.varM6Y0 = sbp_single[i+5].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+6].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM7Y0=''; else  obj6.varM7Y0 = sbp_single[i+6].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+7].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM8Y0=''; else  obj6.varM8Y0 = sbp_single[i+7].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+8].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM9Y0=''; else  obj6.varM9Y0 = sbp_single[i+8].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+9].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM10Y0=''; else  obj6.varM10Y0 = sbp_single[i+9].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+10].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM11Y0=''; else  obj6.varM11Y0 = sbp_single[i+10].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+11].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM12Y0=''; else  obj6.varM12Y0 = sbp_single[i+11].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+12].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM1Y1=''; else  obj6.varM1Y1 = sbp_single[i+12].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+13].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM2Y1=''; else  obj6.varM2Y1 = sbp_single[i+13].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+14].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM3Y1=''; else  obj6.varM3Y1 = sbp_single[i+14].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+15].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM4Y1=''; else  obj6.varM4Y1 = sbp_single[i+15].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+16].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM5Y1=''; else  obj6.varM5Y1 = sbp_single[i+16].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+17].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM6Y1=''; else  obj6.varM6Y1 = sbp_single[i+17].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+18].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM7Y1=''; else  obj6.varM7Y1 = sbp_single[i+18].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+19].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM8Y1=''; else  obj6.varM8Y1 = sbp_single[i+19].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+20].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM9Y1=''; else  obj6.varM9Y1 = sbp_single[i+20].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+21].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM10Y1=''; else  obj6.varM10Y1 = sbp_single[i+21].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+22].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM11Y1=''; else  obj6.varM11Y1 = sbp_single[i+22].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+23].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM12Y1=''; else  obj6.varM12Y1 = sbp_single[i+23].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+24].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM1Y2=''; else  obj6.varM1Y2 = sbp_single[i+24].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+25].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM2Y2=''; else  obj6.varM2Y2 = sbp_single[i+25].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+26].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM3Y2=''; else  obj6.varM3Y2 = sbp_single[i+26].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+27].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM4Y2=''; else  obj6.varM4Y2 = sbp_single[i+27].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+28].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM5Y2=''; else  obj6.varM5Y2 = sbp_single[i+28].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+29].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM6Y2=''; else  obj6.varM6Y2 = sbp_single[i+29].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+30].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM7Y2=''; else  obj6.varM7Y2 = sbp_single[i+30].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+31].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM8Y2=''; else  obj6.varM8Y2 = sbp_single[i+31].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+32].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM9Y2=''; else  obj6.varM9Y2 = sbp_single[i+32].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+33].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM10Y2=''; else  obj6.varM10Y2 = sbp_single[i+33].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+34].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM11Y2=''; else  obj6.varM11Y2 = sbp_single[i+34].PURE_PRICE_BIZ_WINS_String__c;
            if (sbp_single[i+35].PURE_PRICE_BIZ_WINS_String__c=='0.00') obj6.varM12Y2=''; else  obj6.varM12Y2 = sbp_single[i+35].PURE_PRICE_BIZ_WINS_String__c;
            
            sbp_tran_single.add(obj6);
            
            SBPListWrapper obj7= new SBPListWrapper();
            
            obj7.varPrice_RC = 'VE/HLRR PT';
            if (sbp_single[i].HLRR_String__c=='0.00') obj7.varM1Y0=''; else  obj7.varM1Y0 = sbp_single[i].HLRR_String__c;
            if (sbp_single[i+1].HLRR_String__c=='0.00') obj7.varM2Y0=''; else  obj7.varM2Y0 = sbp_single[i+1].HLRR_String__c;
            if (sbp_single[i+2].HLRR_String__c=='0.00') obj7.varM3Y0=''; else  obj7.varM3Y0 = sbp_single[i+2].HLRR_String__c;
            if (sbp_single[i+3].HLRR_String__c=='0.00') obj7.varM4Y0=''; else  obj7.varM4Y0 = sbp_single[i+3].HLRR_String__c;
            if (sbp_single[i+4].HLRR_String__c=='0.00') obj7.varM5Y0=''; else  obj7.varM5Y0 = sbp_single[i+4].HLRR_String__c;
            if (sbp_single[i+5].HLRR_String__c=='0.00') obj7.varM6Y0=''; else  obj7.varM6Y0 = sbp_single[i+5].HLRR_String__c;
            if (sbp_single[i+6].HLRR_String__c=='0.00') obj7.varM7Y0=''; else  obj7.varM7Y0 = sbp_single[i+6].HLRR_String__c;
            if (sbp_single[i+7].HLRR_String__c=='0.00') obj7.varM8Y0=''; else  obj7.varM8Y0 = sbp_single[i+7].HLRR_String__c;
            if (sbp_single[i+8].HLRR_String__c=='0.00') obj7.varM9Y0=''; else  obj7.varM9Y0 = sbp_single[i+8].HLRR_String__c;
            if (sbp_single[i+9].HLRR_String__c=='0.00') obj7.varM10Y0=''; else  obj7.varM10Y0 = sbp_single[i+9].HLRR_String__c;
            if (sbp_single[i+10].HLRR_String__c=='0.00') obj7.varM11Y0=''; else  obj7.varM11Y0 = sbp_single[i+10].HLRR_String__c;
            if (sbp_single[i+11].HLRR_String__c=='0.00') obj7.varM12Y0=''; else  obj7.varM12Y0 = sbp_single[i+11].HLRR_String__c;
            if (sbp_single[i+12].HLRR_String__c=='0.00') obj7.varM1Y1=''; else  obj7.varM1Y1 = sbp_single[i+12].HLRR_String__c;
            if (sbp_single[i+13].HLRR_String__c=='0.00') obj7.varM2Y1=''; else  obj7.varM2Y1 = sbp_single[i+13].HLRR_String__c;
            if (sbp_single[i+14].HLRR_String__c=='0.00') obj7.varM3Y1=''; else  obj7.varM3Y1 = sbp_single[i+14].HLRR_String__c;
            if (sbp_single[i+15].HLRR_String__c=='0.00') obj7.varM4Y1=''; else  obj7.varM4Y1 = sbp_single[i+15].HLRR_String__c;
            if (sbp_single[i+16].HLRR_String__c=='0.00') obj7.varM5Y1=''; else  obj7.varM5Y1 = sbp_single[i+16].HLRR_String__c;
            if (sbp_single[i+17].HLRR_String__c=='0.00') obj7.varM6Y1=''; else  obj7.varM6Y1 = sbp_single[i+17].HLRR_String__c;
            if (sbp_single[i+18].HLRR_String__c=='0.00') obj7.varM7Y1=''; else  obj7.varM7Y1 = sbp_single[i+18].HLRR_String__c;
            if (sbp_single[i+19].HLRR_String__c=='0.00') obj7.varM8Y1=''; else  obj7.varM8Y1 = sbp_single[i+19].HLRR_String__c;
            if (sbp_single[i+20].HLRR_String__c=='0.00') obj7.varM9Y1=''; else  obj7.varM9Y1 = sbp_single[i+20].HLRR_String__c;
            if (sbp_single[i+21].HLRR_String__c=='0.00') obj7.varM10Y1=''; else  obj7.varM10Y1 = sbp_single[i+21].HLRR_String__c;
            if (sbp_single[i+22].HLRR_String__c=='0.00') obj7.varM11Y1=''; else  obj7.varM11Y1 = sbp_single[i+22].HLRR_String__c;
            if (sbp_single[i+23].HLRR_String__c=='0.00') obj7.varM12Y1=''; else  obj7.varM12Y1 = sbp_single[i+23].HLRR_String__c;
            if (sbp_single[i+24].HLRR_String__c=='0.00') obj7.varM1Y2=''; else  obj7.varM1Y2 = sbp_single[i+24].HLRR_String__c;
            if (sbp_single[i+25].HLRR_String__c=='0.00') obj7.varM2Y2=''; else  obj7.varM2Y2 = sbp_single[i+25].HLRR_String__c;
            if (sbp_single[i+26].HLRR_String__c=='0.00') obj7.varM3Y2=''; else  obj7.varM3Y2 = sbp_single[i+26].HLRR_String__c;
            if (sbp_single[i+27].HLRR_String__c=='0.00') obj7.varM4Y2=''; else  obj7.varM4Y2 = sbp_single[i+27].HLRR_String__c;
            if (sbp_single[i+28].HLRR_String__c=='0.00') obj7.varM5Y2=''; else  obj7.varM5Y2 = sbp_single[i+28].HLRR_String__c;
            if (sbp_single[i+29].HLRR_String__c=='0.00') obj7.varM6Y2=''; else  obj7.varM6Y2 = sbp_single[i+29].HLRR_String__c;
            if (sbp_single[i+30].HLRR_String__c=='0.00') obj7.varM7Y2=''; else  obj7.varM7Y2 = sbp_single[i+30].HLRR_String__c;
            if (sbp_single[i+31].HLRR_String__c=='0.00') obj7.varM8Y2=''; else  obj7.varM8Y2 = sbp_single[i+31].HLRR_String__c;
            if (sbp_single[i+32].HLRR_String__c=='0.00') obj7.varM9Y2=''; else  obj7.varM9Y2 = sbp_single[i+32].HLRR_String__c;
            if (sbp_single[i+33].HLRR_String__c=='0.00') obj7.varM10Y2=''; else  obj7.varM10Y2 = sbp_single[i+33].HLRR_String__c;
            if (sbp_single[i+34].HLRR_String__c=='0.00') obj7.varM11Y2=''; else  obj7.varM11Y2 = sbp_single[i+34].HLRR_String__c;
            if (sbp_single[i+35].HLRR_String__c=='0.00') obj7.varM12Y2=''; else  obj7.varM12Y2 = sbp_single[i+35].HLRR_String__c;
            
            sbp_tran_single.add(obj7);
            
            SBPListWrapper obj8= new SBPListWrapper();
            
            obj8.varPrice_RC = 'Nickel';
            if (sbp_single[i].NICKEL_String__c=='0.00') obj8.varM1Y0=''; else  obj8.varM1Y0 = sbp_single[i].NICKEL_String__c;
            if (sbp_single[i+1].NICKEL_String__c=='0.00') obj8.varM2Y0=''; else  obj8.varM2Y0 = sbp_single[i+1].NICKEL_String__c;
            if (sbp_single[i+2].NICKEL_String__c=='0.00') obj8.varM3Y0=''; else  obj8.varM3Y0 = sbp_single[i+2].NICKEL_String__c;
            if (sbp_single[i+3].NICKEL_String__c=='0.00') obj8.varM4Y0=''; else  obj8.varM4Y0 = sbp_single[i+3].NICKEL_String__c;
            if (sbp_single[i+4].NICKEL_String__c=='0.00') obj8.varM5Y0=''; else  obj8.varM5Y0 = sbp_single[i+4].NICKEL_String__c;
            if (sbp_single[i+5].NICKEL_String__c=='0.00') obj8.varM6Y0=''; else  obj8.varM6Y0 = sbp_single[i+5].NICKEL_String__c;
            if (sbp_single[i+6].NICKEL_String__c=='0.00') obj8.varM7Y0=''; else  obj8.varM7Y0 = sbp_single[i+6].NICKEL_String__c;
            if (sbp_single[i+7].NICKEL_String__c=='0.00') obj8.varM8Y0=''; else  obj8.varM8Y0 = sbp_single[i+7].NICKEL_String__c;
            if (sbp_single[i+8].NICKEL_String__c=='0.00') obj8.varM9Y0=''; else  obj8.varM9Y0 = sbp_single[i+8].NICKEL_String__c;
            if (sbp_single[i+9].NICKEL_String__c=='0.00') obj8.varM10Y0=''; else  obj8.varM10Y0 = sbp_single[i+9].NICKEL_String__c;
            if (sbp_single[i+10].NICKEL_String__c=='0.00') obj8.varM11Y0=''; else  obj8.varM11Y0 = sbp_single[i+10].NICKEL_String__c;
            if (sbp_single[i+11].NICKEL_String__c=='0.00') obj8.varM12Y0=''; else  obj8.varM12Y0 = sbp_single[i+11].NICKEL_String__c;
            if (sbp_single[i+12].NICKEL_String__c=='0.00') obj8.varM1Y1=''; else  obj8.varM1Y1 = sbp_single[i+12].NICKEL_String__c;
            if (sbp_single[i+13].NICKEL_String__c=='0.00') obj8.varM2Y1=''; else  obj8.varM2Y1 = sbp_single[i+13].NICKEL_String__c;
            if (sbp_single[i+14].NICKEL_String__c=='0.00') obj8.varM3Y1=''; else  obj8.varM3Y1 = sbp_single[i+14].NICKEL_String__c;
            if (sbp_single[i+15].NICKEL_String__c=='0.00') obj8.varM4Y1=''; else  obj8.varM4Y1 = sbp_single[i+15].NICKEL_String__c;
            if (sbp_single[i+16].NICKEL_String__c=='0.00') obj8.varM5Y1=''; else  obj8.varM5Y1 = sbp_single[i+16].NICKEL_String__c;
            if (sbp_single[i+17].NICKEL_String__c=='0.00') obj8.varM6Y1=''; else  obj8.varM6Y1 = sbp_single[i+17].NICKEL_String__c;
            if (sbp_single[i+18].NICKEL_String__c=='0.00') obj8.varM7Y1=''; else  obj8.varM7Y1 = sbp_single[i+18].NICKEL_String__c;
            if (sbp_single[i+19].NICKEL_String__c=='0.00') obj8.varM8Y1=''; else  obj8.varM8Y1 = sbp_single[i+19].NICKEL_String__c;
            if (sbp_single[i+20].NICKEL_String__c=='0.00') obj8.varM9Y1=''; else  obj8.varM9Y1 = sbp_single[i+20].NICKEL_String__c;
            if (sbp_single[i+21].NICKEL_String__c=='0.00') obj8.varM10Y1=''; else  obj8.varM10Y1 = sbp_single[i+21].NICKEL_String__c;
            if (sbp_single[i+22].NICKEL_String__c=='0.00') obj8.varM11Y1=''; else  obj8.varM11Y1 = sbp_single[i+22].NICKEL_String__c;
            if (sbp_single[i+23].NICKEL_String__c=='0.00') obj8.varM12Y1=''; else  obj8.varM12Y1 = sbp_single[i+23].NICKEL_String__c;
            if (sbp_single[i+24].NICKEL_String__c=='0.00') obj8.varM1Y2=''; else  obj8.varM1Y2 = sbp_single[i+24].NICKEL_String__c;
            if (sbp_single[i+25].NICKEL_String__c=='0.00') obj8.varM2Y2=''; else  obj8.varM2Y2 = sbp_single[i+25].NICKEL_String__c;
            if (sbp_single[i+26].NICKEL_String__c=='0.00') obj8.varM3Y2=''; else  obj8.varM3Y2 = sbp_single[i+26].NICKEL_String__c;
            if (sbp_single[i+27].NICKEL_String__c=='0.00') obj8.varM4Y2=''; else  obj8.varM4Y2 = sbp_single[i+27].NICKEL_String__c;
            if (sbp_single[i+28].NICKEL_String__c=='0.00') obj8.varM5Y2=''; else  obj8.varM5Y2 = sbp_single[i+28].NICKEL_String__c;
            if (sbp_single[i+29].NICKEL_String__c=='0.00') obj8.varM6Y2=''; else  obj8.varM6Y2 = sbp_single[i+29].NICKEL_String__c;
            if (sbp_single[i+30].NICKEL_String__c=='0.00') obj8.varM7Y2=''; else  obj8.varM7Y2 = sbp_single[i+30].NICKEL_String__c;
            if (sbp_single[i+31].NICKEL_String__c=='0.00') obj8.varM8Y2=''; else  obj8.varM8Y2 = sbp_single[i+31].NICKEL_String__c;
            if (sbp_single[i+32].NICKEL_String__c=='0.00') obj8.varM9Y2=''; else  obj8.varM9Y2 = sbp_single[i+32].NICKEL_String__c;
            if (sbp_single[i+33].NICKEL_String__c=='0.00') obj8.varM10Y2=''; else  obj8.varM10Y2 = sbp_single[i+33].NICKEL_String__c;
            if (sbp_single[i+34].NICKEL_String__c=='0.00') obj8.varM11Y2=''; else  obj8.varM11Y2 = sbp_single[i+34].NICKEL_String__c;
            if (sbp_single[i+35].NICKEL_String__c=='0.00') obj8.varM12Y2=''; else  obj8.varM12Y2 = sbp_single[i+35].NICKEL_String__c;
            
            sbp_tran_single.add(obj8);
            
            SBPListWrapper obj9= new SBPListWrapper();
            
            obj9.varPrice_RC = 'Aluminium';
            if (sbp_single[i].ALUMINUM_String__c=='0.00') obj9.varM1Y0=''; else  obj9.varM1Y0 = sbp_single[i].ALUMINUM_String__c;
            if (sbp_single[i+1].ALUMINUM_String__c=='0.00') obj9.varM2Y0=''; else  obj9.varM2Y0 = sbp_single[i+1].ALUMINUM_String__c;
            if (sbp_single[i+2].ALUMINUM_String__c=='0.00') obj9.varM3Y0=''; else  obj9.varM3Y0 = sbp_single[i+2].ALUMINUM_String__c;
            if (sbp_single[i+3].ALUMINUM_String__c=='0.00') obj9.varM4Y0=''; else  obj9.varM4Y0 = sbp_single[i+3].ALUMINUM_String__c;
            if (sbp_single[i+4].ALUMINUM_String__c=='0.00') obj9.varM5Y0=''; else  obj9.varM5Y0 = sbp_single[i+4].ALUMINUM_String__c;
            if (sbp_single[i+5].ALUMINUM_String__c=='0.00') obj9.varM6Y0=''; else  obj9.varM6Y0 = sbp_single[i+5].ALUMINUM_String__c;
            if (sbp_single[i+6].ALUMINUM_String__c=='0.00') obj9.varM7Y0=''; else  obj9.varM7Y0 = sbp_single[i+6].ALUMINUM_String__c;
            if (sbp_single[i+7].ALUMINUM_String__c=='0.00') obj9.varM8Y0=''; else  obj9.varM8Y0 = sbp_single[i+7].ALUMINUM_String__c;
            if (sbp_single[i+8].ALUMINUM_String__c=='0.00') obj9.varM9Y0=''; else  obj9.varM9Y0 = sbp_single[i+8].ALUMINUM_String__c;
            if (sbp_single[i+9].ALUMINUM_String__c=='0.00') obj9.varM10Y0=''; else  obj9.varM10Y0 = sbp_single[i+9].ALUMINUM_String__c;
            if (sbp_single[i+10].ALUMINUM_String__c=='0.00') obj9.varM11Y0=''; else  obj9.varM11Y0 = sbp_single[i+10].ALUMINUM_String__c;
            if (sbp_single[i+11].ALUMINUM_String__c=='0.00') obj9.varM12Y0=''; else  obj9.varM12Y0 = sbp_single[i+11].ALUMINUM_String__c;
            if (sbp_single[i+12].ALUMINUM_String__c=='0.00') obj9.varM1Y1=''; else  obj9.varM1Y1 = sbp_single[i+12].ALUMINUM_String__c;
            if (sbp_single[i+13].ALUMINUM_String__c=='0.00') obj9.varM2Y1=''; else  obj9.varM2Y1 = sbp_single[i+13].ALUMINUM_String__c;
            if (sbp_single[i+14].ALUMINUM_String__c=='0.00') obj9.varM3Y1=''; else  obj9.varM3Y1 = sbp_single[i+14].ALUMINUM_String__c;
            if (sbp_single[i+15].ALUMINUM_String__c=='0.00') obj9.varM4Y1=''; else  obj9.varM4Y1 = sbp_single[i+15].ALUMINUM_String__c;
            if (sbp_single[i+16].ALUMINUM_String__c=='0.00') obj9.varM5Y1=''; else  obj9.varM5Y1 = sbp_single[i+16].ALUMINUM_String__c;
            if (sbp_single[i+17].ALUMINUM_String__c=='0.00') obj9.varM6Y1=''; else  obj9.varM6Y1 = sbp_single[i+17].ALUMINUM_String__c;
            if (sbp_single[i+18].ALUMINUM_String__c=='0.00') obj9.varM7Y1=''; else  obj9.varM7Y1 = sbp_single[i+18].ALUMINUM_String__c;
            if (sbp_single[i+19].ALUMINUM_String__c=='0.00') obj9.varM8Y1=''; else  obj9.varM8Y1 = sbp_single[i+19].ALUMINUM_String__c;
            if (sbp_single[i+20].ALUMINUM_String__c=='0.00') obj9.varM9Y1=''; else  obj9.varM9Y1 = sbp_single[i+20].ALUMINUM_String__c;
            if (sbp_single[i+21].ALUMINUM_String__c=='0.00') obj9.varM10Y1=''; else  obj9.varM10Y1 = sbp_single[i+21].ALUMINUM_String__c;
            if (sbp_single[i+22].ALUMINUM_String__c=='0.00') obj9.varM11Y1=''; else  obj9.varM11Y1 = sbp_single[i+22].ALUMINUM_String__c;
            if (sbp_single[i+23].ALUMINUM_String__c=='0.00') obj9.varM12Y1=''; else  obj9.varM12Y1 = sbp_single[i+23].ALUMINUM_String__c;
            if (sbp_single[i+24].ALUMINUM_String__c=='0.00') obj9.varM1Y2=''; else  obj9.varM1Y2 = sbp_single[i+24].ALUMINUM_String__c;
            if (sbp_single[i+25].ALUMINUM_String__c=='0.00') obj9.varM2Y2=''; else  obj9.varM2Y2 = sbp_single[i+25].ALUMINUM_String__c;
            if (sbp_single[i+26].ALUMINUM_String__c=='0.00') obj9.varM3Y2=''; else  obj9.varM3Y2 = sbp_single[i+26].ALUMINUM_String__c;
            if (sbp_single[i+27].ALUMINUM_String__c=='0.00') obj9.varM4Y2=''; else  obj9.varM4Y2 = sbp_single[i+27].ALUMINUM_String__c;
            if (sbp_single[i+28].ALUMINUM_String__c=='0.00') obj9.varM5Y2=''; else  obj9.varM5Y2 = sbp_single[i+28].ALUMINUM_String__c;
            if (sbp_single[i+29].ALUMINUM_String__c=='0.00') obj9.varM6Y2=''; else  obj9.varM6Y2 = sbp_single[i+29].ALUMINUM_String__c;
            if (sbp_single[i+30].ALUMINUM_String__c=='0.00') obj9.varM7Y2=''; else  obj9.varM7Y2 = sbp_single[i+30].ALUMINUM_String__c;
            if (sbp_single[i+31].ALUMINUM_String__c=='0.00') obj9.varM8Y2=''; else  obj9.varM8Y2 = sbp_single[i+31].ALUMINUM_String__c;
            if (sbp_single[i+32].ALUMINUM_String__c=='0.00') obj9.varM9Y2=''; else  obj9.varM9Y2 = sbp_single[i+32].ALUMINUM_String__c;
            if (sbp_single[i+33].ALUMINUM_String__c=='0.00') obj9.varM10Y2=''; else  obj9.varM10Y2 = sbp_single[i+33].ALUMINUM_String__c;
            if (sbp_single[i+34].ALUMINUM_String__c=='0.00') obj9.varM11Y2=''; else  obj9.varM11Y2 = sbp_single[i+34].ALUMINUM_String__c;
            if (sbp_single[i+35].ALUMINUM_String__c=='0.00') obj9.varM12Y2=''; else  obj9.varM12Y2 = sbp_single[i+35].ALUMINUM_String__c;
            
            sbp_tran_single.add(obj9);
            
            SBPListWrapper obj10= new SBPListWrapper();
            
            obj10.varPrice_RC = 'Molybdenum';
            if (sbp_single[i].MOLYBDENUM_String__c=='0.00') obj10.varM1Y0=''; else  obj10.varM1Y0 = sbp_single[i].MOLYBDENUM_String__c;
            if (sbp_single[i+1].MOLYBDENUM_String__c=='0.00') obj10.varM2Y0=''; else  obj10.varM2Y0 = sbp_single[i+1].MOLYBDENUM_String__c;
            if (sbp_single[i+2].MOLYBDENUM_String__c=='0.00') obj10.varM3Y0=''; else  obj10.varM3Y0 = sbp_single[i+2].MOLYBDENUM_String__c;
            if (sbp_single[i+3].MOLYBDENUM_String__c=='0.00') obj10.varM4Y0=''; else  obj10.varM4Y0 = sbp_single[i+3].MOLYBDENUM_String__c;
            if (sbp_single[i+4].MOLYBDENUM_String__c=='0.00') obj10.varM5Y0=''; else  obj10.varM5Y0 = sbp_single[i+4].MOLYBDENUM_String__c;
            if (sbp_single[i+5].MOLYBDENUM_String__c=='0.00') obj10.varM6Y0=''; else  obj10.varM6Y0 = sbp_single[i+5].MOLYBDENUM_String__c;
            if (sbp_single[i+6].MOLYBDENUM_String__c=='0.00') obj10.varM7Y0=''; else  obj10.varM7Y0 = sbp_single[i+6].MOLYBDENUM_String__c;
            if (sbp_single[i+7].MOLYBDENUM_String__c=='0.00') obj10.varM8Y0=''; else  obj10.varM8Y0 = sbp_single[i+7].MOLYBDENUM_String__c;
            if (sbp_single[i+8].MOLYBDENUM_String__c=='0.00') obj10.varM9Y0=''; else  obj10.varM9Y0 = sbp_single[i+8].MOLYBDENUM_String__c;
            if (sbp_single[i+9].MOLYBDENUM_String__c=='0.00') obj10.varM10Y0=''; else  obj10.varM10Y0 = sbp_single[i+9].MOLYBDENUM_String__c;
            if (sbp_single[i+10].MOLYBDENUM_String__c=='0.00') obj10.varM11Y0=''; else  obj10.varM11Y0 = sbp_single[i+10].MOLYBDENUM_String__c;
            if (sbp_single[i+11].MOLYBDENUM_String__c=='0.00') obj10.varM12Y0=''; else  obj10.varM12Y0 = sbp_single[i+11].MOLYBDENUM_String__c;
            if (sbp_single[i+12].MOLYBDENUM_String__c=='0.00') obj10.varM1Y1=''; else  obj10.varM1Y1 = sbp_single[i+12].MOLYBDENUM_String__c;
            if (sbp_single[i+13].MOLYBDENUM_String__c=='0.00') obj10.varM2Y1=''; else  obj10.varM2Y1 = sbp_single[i+13].MOLYBDENUM_String__c;
            if (sbp_single[i+14].MOLYBDENUM_String__c=='0.00') obj10.varM3Y1=''; else  obj10.varM3Y1 = sbp_single[i+14].MOLYBDENUM_String__c;
            if (sbp_single[i+15].MOLYBDENUM_String__c=='0.00') obj10.varM4Y1=''; else  obj10.varM4Y1 = sbp_single[i+15].MOLYBDENUM_String__c;
            if (sbp_single[i+16].MOLYBDENUM_String__c=='0.00') obj10.varM5Y1=''; else  obj10.varM5Y1 = sbp_single[i+16].MOLYBDENUM_String__c;
            if (sbp_single[i+17].MOLYBDENUM_String__c=='0.00') obj10.varM6Y1=''; else  obj10.varM6Y1 = sbp_single[i+17].MOLYBDENUM_String__c;
            if (sbp_single[i+18].MOLYBDENUM_String__c=='0.00') obj10.varM7Y1=''; else  obj10.varM7Y1 = sbp_single[i+18].MOLYBDENUM_String__c;
            if (sbp_single[i+19].MOLYBDENUM_String__c=='0.00') obj10.varM8Y1=''; else  obj10.varM8Y1 = sbp_single[i+19].MOLYBDENUM_String__c;
            if (sbp_single[i+20].MOLYBDENUM_String__c=='0.00') obj10.varM9Y1=''; else  obj10.varM9Y1 = sbp_single[i+20].MOLYBDENUM_String__c;
            if (sbp_single[i+21].MOLYBDENUM_String__c=='0.00') obj10.varM10Y1=''; else  obj10.varM10Y1 = sbp_single[i+21].MOLYBDENUM_String__c;
            if (sbp_single[i+22].MOLYBDENUM_String__c=='0.00') obj10.varM11Y1=''; else  obj10.varM11Y1 = sbp_single[i+22].MOLYBDENUM_String__c;
            if (sbp_single[i+23].MOLYBDENUM_String__c=='0.00') obj10.varM12Y1=''; else  obj10.varM12Y1 = sbp_single[i+23].MOLYBDENUM_String__c;
            if (sbp_single[i+24].MOLYBDENUM_String__c=='0.00') obj10.varM1Y2=''; else  obj10.varM1Y2 = sbp_single[i+24].MOLYBDENUM_String__c;
            if (sbp_single[i+25].MOLYBDENUM_String__c=='0.00') obj10.varM2Y2=''; else  obj10.varM2Y2 = sbp_single[i+25].MOLYBDENUM_String__c;
            if (sbp_single[i+26].MOLYBDENUM_String__c=='0.00') obj10.varM3Y2=''; else  obj10.varM3Y2 = sbp_single[i+26].MOLYBDENUM_String__c;
            if (sbp_single[i+27].MOLYBDENUM_String__c=='0.00') obj10.varM4Y2=''; else  obj10.varM4Y2 = sbp_single[i+27].MOLYBDENUM_String__c;
            if (sbp_single[i+28].MOLYBDENUM_String__c=='0.00') obj10.varM5Y2=''; else  obj10.varM5Y2 = sbp_single[i+28].MOLYBDENUM_String__c;
            if (sbp_single[i+29].MOLYBDENUM_String__c=='0.00') obj10.varM6Y2=''; else  obj10.varM6Y2 = sbp_single[i+29].MOLYBDENUM_String__c;
            if (sbp_single[i+30].MOLYBDENUM_String__c=='0.00') obj10.varM7Y2=''; else  obj10.varM7Y2 = sbp_single[i+30].MOLYBDENUM_String__c;
            if (sbp_single[i+31].MOLYBDENUM_String__c=='0.00') obj10.varM8Y2=''; else  obj10.varM8Y2 = sbp_single[i+31].MOLYBDENUM_String__c;
            if (sbp_single[i+32].MOLYBDENUM_String__c=='0.00') obj10.varM9Y2=''; else  obj10.varM9Y2 = sbp_single[i+32].MOLYBDENUM_String__c;
            if (sbp_single[i+33].MOLYBDENUM_String__c=='0.00') obj10.varM10Y2=''; else  obj10.varM10Y2 = sbp_single[i+33].MOLYBDENUM_String__c;
            if (sbp_single[i+34].MOLYBDENUM_String__c=='0.00') obj10.varM11Y2=''; else  obj10.varM11Y2 = sbp_single[i+34].MOLYBDENUM_String__c;
            if (sbp_single[i+35].MOLYBDENUM_String__c=='0.00') obj10.varM12Y2=''; else  obj10.varM12Y2 = sbp_single[i+35].MOLYBDENUM_String__c;
            
            sbp_tran_single.add(obj10);
            
            SBPListWrapper obj11= new SBPListWrapper();
            
            obj11.varPrice_RC = 'Other metals';
            if (sbp_single[i].OTHER_METALS_String__c=='0.00') obj11.varM1Y0=''; else  obj11.varM1Y0 = sbp_single[i].OTHER_METALS_String__c;
            if (sbp_single[i+1].OTHER_METALS_String__c=='0.00') obj11.varM2Y0=''; else  obj11.varM2Y0 = sbp_single[i+1].OTHER_METALS_String__c;
            if (sbp_single[i+2].OTHER_METALS_String__c=='0.00') obj11.varM3Y0=''; else  obj11.varM3Y0 = sbp_single[i+2].OTHER_METALS_String__c;
            if (sbp_single[i+3].OTHER_METALS_String__c=='0.00') obj11.varM4Y0=''; else  obj11.varM4Y0 = sbp_single[i+3].OTHER_METALS_String__c;
            if (sbp_single[i+4].OTHER_METALS_String__c=='0.00') obj11.varM5Y0=''; else  obj11.varM5Y0 = sbp_single[i+4].OTHER_METALS_String__c;
            if (sbp_single[i+5].OTHER_METALS_String__c=='0.00') obj11.varM6Y0=''; else  obj11.varM6Y0 = sbp_single[i+5].OTHER_METALS_String__c;
            if (sbp_single[i+6].OTHER_METALS_String__c=='0.00') obj11.varM7Y0=''; else  obj11.varM7Y0 = sbp_single[i+6].OTHER_METALS_String__c;
            if (sbp_single[i+7].OTHER_METALS_String__c=='0.00') obj11.varM8Y0=''; else  obj11.varM8Y0 = sbp_single[i+7].OTHER_METALS_String__c;
            if (sbp_single[i+8].OTHER_METALS_String__c=='0.00') obj11.varM9Y0=''; else  obj11.varM9Y0 = sbp_single[i+8].OTHER_METALS_String__c;
            if (sbp_single[i+9].OTHER_METALS_String__c=='0.00') obj11.varM10Y0=''; else  obj11.varM10Y0 = sbp_single[i+9].OTHER_METALS_String__c;
            if (sbp_single[i+10].OTHER_METALS_String__c=='0.00') obj11.varM11Y0=''; else  obj11.varM11Y0 = sbp_single[i+10].OTHER_METALS_String__c;
            if (sbp_single[i+11].OTHER_METALS_String__c=='0.00') obj11.varM12Y0=''; else  obj11.varM12Y0 = sbp_single[i+11].OTHER_METALS_String__c;
            if (sbp_single[i+12].OTHER_METALS_String__c=='0.00') obj11.varM1Y1=''; else  obj11.varM1Y1 = sbp_single[i+12].OTHER_METALS_String__c;
            if (sbp_single[i+13].OTHER_METALS_String__c=='0.00') obj11.varM2Y1=''; else  obj11.varM2Y1 = sbp_single[i+13].OTHER_METALS_String__c;
            if (sbp_single[i+14].OTHER_METALS_String__c=='0.00') obj11.varM3Y1=''; else  obj11.varM3Y1 = sbp_single[i+14].OTHER_METALS_String__c;
            if (sbp_single[i+15].OTHER_METALS_String__c=='0.00') obj11.varM4Y1=''; else  obj11.varM4Y1 = sbp_single[i+15].OTHER_METALS_String__c;
            if (sbp_single[i+16].OTHER_METALS_String__c=='0.00') obj11.varM5Y1=''; else  obj11.varM5Y1 = sbp_single[i+16].OTHER_METALS_String__c;
            if (sbp_single[i+17].OTHER_METALS_String__c=='0.00') obj11.varM6Y1=''; else  obj11.varM6Y1 = sbp_single[i+17].OTHER_METALS_String__c;
            if (sbp_single[i+18].OTHER_METALS_String__c=='0.00') obj11.varM7Y1=''; else  obj11.varM7Y1 = sbp_single[i+18].OTHER_METALS_String__c;
            if (sbp_single[i+19].OTHER_METALS_String__c=='0.00') obj11.varM8Y1=''; else  obj11.varM8Y1 = sbp_single[i+19].OTHER_METALS_String__c;
            if (sbp_single[i+20].OTHER_METALS_String__c=='0.00') obj11.varM9Y1=''; else  obj11.varM9Y1 = sbp_single[i+20].OTHER_METALS_String__c;
            if (sbp_single[i+21].OTHER_METALS_String__c=='0.00') obj11.varM10Y1=''; else  obj11.varM10Y1 = sbp_single[i+21].OTHER_METALS_String__c;
            if (sbp_single[i+22].OTHER_METALS_String__c=='0.00') obj11.varM11Y1=''; else  obj11.varM11Y1 = sbp_single[i+22].OTHER_METALS_String__c;
            if (sbp_single[i+23].OTHER_METALS_String__c=='0.00') obj11.varM12Y1=''; else  obj11.varM12Y1 = sbp_single[i+23].OTHER_METALS_String__c;
            if (sbp_single[i+24].OTHER_METALS_String__c=='0.00') obj11.varM1Y2=''; else  obj11.varM1Y2 = sbp_single[i+24].OTHER_METALS_String__c;
            if (sbp_single[i+25].OTHER_METALS_String__c=='0.00') obj11.varM2Y2=''; else  obj11.varM2Y2 = sbp_single[i+25].OTHER_METALS_String__c;
            if (sbp_single[i+26].OTHER_METALS_String__c=='0.00') obj11.varM3Y2=''; else  obj11.varM3Y2 = sbp_single[i+26].OTHER_METALS_String__c;
            if (sbp_single[i+27].OTHER_METALS_String__c=='0.00') obj11.varM4Y2=''; else  obj11.varM4Y2 = sbp_single[i+27].OTHER_METALS_String__c;
            if (sbp_single[i+28].OTHER_METALS_String__c=='0.00') obj11.varM5Y2=''; else  obj11.varM5Y2 = sbp_single[i+28].OTHER_METALS_String__c;
            if (sbp_single[i+29].OTHER_METALS_String__c=='0.00') obj11.varM6Y2=''; else  obj11.varM6Y2 = sbp_single[i+29].OTHER_METALS_String__c;
            if (sbp_single[i+30].OTHER_METALS_String__c=='0.00') obj11.varM7Y2=''; else  obj11.varM7Y2 = sbp_single[i+30].OTHER_METALS_String__c;
            if (sbp_single[i+31].OTHER_METALS_String__c=='0.00') obj11.varM8Y2=''; else  obj11.varM8Y2 = sbp_single[i+31].OTHER_METALS_String__c;
            if (sbp_single[i+32].OTHER_METALS_String__c=='0.00') obj11.varM9Y2=''; else  obj11.varM9Y2 = sbp_single[i+32].OTHER_METALS_String__c;
            if (sbp_single[i+33].OTHER_METALS_String__c=='0.00') obj11.varM10Y2=''; else  obj11.varM10Y2 = sbp_single[i+33].OTHER_METALS_String__c;
            if (sbp_single[i+34].OTHER_METALS_String__c=='0.00') obj11.varM11Y2=''; else  obj11.varM11Y2 = sbp_single[i+34].OTHER_METALS_String__c;
            if (sbp_single[i+35].OTHER_METALS_String__c=='0.00') obj11.varM12Y2=''; else  obj11.varM12Y2 = sbp_single[i+35].OTHER_METALS_String__c;
            
            sbp_tran_single.add(obj11);
            
            TransposetoWrapper_2part();
        }       

    }
    
    public void TransposetoWrapper_2part(){
    
        Integer i=0;
        
        SBPListWrapper obj12= new SBPListWrapper();
            
            obj12.varPrice_RC = 'Eng. Changes';
            if (sbp_single[i].ENG_CHANGES_String__c=='0.00') obj12.varM1Y0=''; else  obj12.varM1Y0 = sbp_single[i].ENG_CHANGES_String__c;
            if (sbp_single[i+1].ENG_CHANGES_String__c=='0.00') obj12.varM2Y0=''; else  obj12.varM2Y0 = sbp_single[i+1].ENG_CHANGES_String__c;
            if (sbp_single[i+2].ENG_CHANGES_String__c=='0.00') obj12.varM3Y0=''; else  obj12.varM3Y0 = sbp_single[i+2].ENG_CHANGES_String__c;
            if (sbp_single[i+3].ENG_CHANGES_String__c=='0.00') obj12.varM4Y0=''; else  obj12.varM4Y0 = sbp_single[i+3].ENG_CHANGES_String__c;
            if (sbp_single[i+4].ENG_CHANGES_String__c=='0.00') obj12.varM5Y0=''; else  obj12.varM5Y0 = sbp_single[i+4].ENG_CHANGES_String__c;
            if (sbp_single[i+5].ENG_CHANGES_String__c=='0.00') obj12.varM6Y0=''; else  obj12.varM6Y0 = sbp_single[i+5].ENG_CHANGES_String__c;
            if (sbp_single[i+6].ENG_CHANGES_String__c=='0.00') obj12.varM7Y0=''; else  obj12.varM7Y0 = sbp_single[i+6].ENG_CHANGES_String__c;
            if (sbp_single[i+7].ENG_CHANGES_String__c=='0.00') obj12.varM8Y0=''; else  obj12.varM8Y0 = sbp_single[i+7].ENG_CHANGES_String__c;
            if (sbp_single[i+8].ENG_CHANGES_String__c=='0.00') obj12.varM9Y0=''; else  obj12.varM9Y0 = sbp_single[i+8].ENG_CHANGES_String__c;
            if (sbp_single[i+9].ENG_CHANGES_String__c=='0.00') obj12.varM10Y0=''; else  obj12.varM10Y0 = sbp_single[i+9].ENG_CHANGES_String__c;
            if (sbp_single[i+10].ENG_CHANGES_String__c=='0.00') obj12.varM11Y0=''; else  obj12.varM11Y0 = sbp_single[i+10].ENG_CHANGES_String__c;
            if (sbp_single[i+11].ENG_CHANGES_String__c=='0.00') obj12.varM12Y0=''; else  obj12.varM12Y0 = sbp_single[i+11].ENG_CHANGES_String__c;
            if (sbp_single[i+12].ENG_CHANGES_String__c=='0.00') obj12.varM1Y1=''; else  obj12.varM1Y1 = sbp_single[i+12].ENG_CHANGES_String__c;
            if (sbp_single[i+13].ENG_CHANGES_String__c=='0.00') obj12.varM2Y1=''; else  obj12.varM2Y1 = sbp_single[i+13].ENG_CHANGES_String__c;
            if (sbp_single[i+14].ENG_CHANGES_String__c=='0.00') obj12.varM3Y1=''; else  obj12.varM3Y1 = sbp_single[i+14].ENG_CHANGES_String__c;
            if (sbp_single[i+15].ENG_CHANGES_String__c=='0.00') obj12.varM4Y1=''; else  obj12.varM4Y1 = sbp_single[i+15].ENG_CHANGES_String__c;
            if (sbp_single[i+16].ENG_CHANGES_String__c=='0.00') obj12.varM5Y1=''; else  obj12.varM5Y1 = sbp_single[i+16].ENG_CHANGES_String__c;
            if (sbp_single[i+17].ENG_CHANGES_String__c=='0.00') obj12.varM6Y1=''; else  obj12.varM6Y1 = sbp_single[i+17].ENG_CHANGES_String__c;
            if (sbp_single[i+18].ENG_CHANGES_String__c=='0.00') obj12.varM7Y1=''; else  obj12.varM7Y1 = sbp_single[i+18].ENG_CHANGES_String__c;
            if (sbp_single[i+19].ENG_CHANGES_String__c=='0.00') obj12.varM8Y1=''; else  obj12.varM8Y1 = sbp_single[i+19].ENG_CHANGES_String__c;
            if (sbp_single[i+20].ENG_CHANGES_String__c=='0.00') obj12.varM9Y1=''; else  obj12.varM9Y1 = sbp_single[i+20].ENG_CHANGES_String__c;
            if (sbp_single[i+21].ENG_CHANGES_String__c=='0.00') obj12.varM10Y1=''; else  obj12.varM10Y1 = sbp_single[i+21].ENG_CHANGES_String__c;
            if (sbp_single[i+22].ENG_CHANGES_String__c=='0.00') obj12.varM11Y1=''; else  obj12.varM11Y1 = sbp_single[i+22].ENG_CHANGES_String__c;
            if (sbp_single[i+23].ENG_CHANGES_String__c=='0.00') obj12.varM12Y1=''; else  obj12.varM12Y1 = sbp_single[i+23].ENG_CHANGES_String__c;
            if (sbp_single[i+24].ENG_CHANGES_String__c=='0.00') obj12.varM1Y2=''; else  obj12.varM1Y2 = sbp_single[i+24].ENG_CHANGES_String__c;
            if (sbp_single[i+25].ENG_CHANGES_String__c=='0.00') obj12.varM2Y2=''; else  obj12.varM2Y2 = sbp_single[i+25].ENG_CHANGES_String__c;
            if (sbp_single[i+26].ENG_CHANGES_String__c=='0.00') obj12.varM3Y2=''; else  obj12.varM3Y2 = sbp_single[i+26].ENG_CHANGES_String__c;
            if (sbp_single[i+27].ENG_CHANGES_String__c=='0.00') obj12.varM4Y2=''; else  obj12.varM4Y2 = sbp_single[i+27].ENG_CHANGES_String__c;
            if (sbp_single[i+28].ENG_CHANGES_String__c=='0.00') obj12.varM5Y2=''; else  obj12.varM5Y2 = sbp_single[i+28].ENG_CHANGES_String__c;
            if (sbp_single[i+29].ENG_CHANGES_String__c=='0.00') obj12.varM6Y2=''; else  obj12.varM6Y2 = sbp_single[i+29].ENG_CHANGES_String__c;
            if (sbp_single[i+30].ENG_CHANGES_String__c=='0.00') obj12.varM7Y2=''; else  obj12.varM7Y2 = sbp_single[i+30].ENG_CHANGES_String__c;
            if (sbp_single[i+31].ENG_CHANGES_String__c=='0.00') obj12.varM8Y2=''; else  obj12.varM8Y2 = sbp_single[i+31].ENG_CHANGES_String__c;
            if (sbp_single[i+32].ENG_CHANGES_String__c=='0.00') obj12.varM9Y2=''; else  obj12.varM9Y2 = sbp_single[i+32].ENG_CHANGES_String__c;
            if (sbp_single[i+33].ENG_CHANGES_String__c=='0.00') obj12.varM10Y2=''; else  obj12.varM10Y2 = sbp_single[i+33].ENG_CHANGES_String__c;
            if (sbp_single[i+34].ENG_CHANGES_String__c=='0.00') obj12.varM11Y2=''; else  obj12.varM11Y2 = sbp_single[i+34].ENG_CHANGES_String__c;
            if (sbp_single[i+35].ENG_CHANGES_String__c=='0.00') obj12.varM12Y2=''; else  obj12.varM12Y2 = sbp_single[i+35].ENG_CHANGES_String__c;
            
            sbp_tran_single.add(obj12);
            
            SBPListWrapper obj13= new SBPListWrapper();
            
            obj13.varPrice_RC = 'FX';
            if (sbp_single[i].FX_String__c=='0.00') obj13.varM1Y0=''; else  obj13.varM1Y0 = sbp_single[i].FX_String__c;
            if (sbp_single[i+1].FX_String__c=='0.00') obj13.varM2Y0=''; else  obj13.varM2Y0 = sbp_single[i+1].FX_String__c;
            if (sbp_single[i+2].FX_String__c=='0.00') obj13.varM3Y0=''; else  obj13.varM3Y0 = sbp_single[i+2].FX_String__c;
            if (sbp_single[i+3].FX_String__c=='0.00') obj13.varM4Y0=''; else  obj13.varM4Y0 = sbp_single[i+3].FX_String__c;
            if (sbp_single[i+4].FX_String__c=='0.00') obj13.varM5Y0=''; else  obj13.varM5Y0 = sbp_single[i+4].FX_String__c;
            if (sbp_single[i+5].FX_String__c=='0.00') obj13.varM6Y0=''; else  obj13.varM6Y0 = sbp_single[i+5].FX_String__c;
            if (sbp_single[i+6].FX_String__c=='0.00') obj13.varM7Y0=''; else  obj13.varM7Y0 = sbp_single[i+6].FX_String__c;
            if (sbp_single[i+7].FX_String__c=='0.00') obj13.varM8Y0=''; else  obj13.varM8Y0 = sbp_single[i+7].FX_String__c;
            if (sbp_single[i+8].FX_String__c=='0.00') obj13.varM9Y0=''; else  obj13.varM9Y0 = sbp_single[i+8].FX_String__c;
            if (sbp_single[i+9].FX_String__c=='0.00') obj13.varM10Y0=''; else  obj13.varM10Y0 = sbp_single[i+9].FX_String__c;
            if (sbp_single[i+10].FX_String__c=='0.00') obj13.varM11Y0=''; else  obj13.varM11Y0 = sbp_single[i+10].FX_String__c;
            if (sbp_single[i+11].FX_String__c=='0.00') obj13.varM12Y0=''; else  obj13.varM12Y0 = sbp_single[i+11].FX_String__c;
            if (sbp_single[i+12].FX_String__c=='0.00') obj13.varM1Y1=''; else  obj13.varM1Y1 = sbp_single[i+12].FX_String__c;
            if (sbp_single[i+13].FX_String__c=='0.00') obj13.varM2Y1=''; else  obj13.varM2Y1 = sbp_single[i+13].FX_String__c;
            if (sbp_single[i+14].FX_String__c=='0.00') obj13.varM3Y1=''; else  obj13.varM3Y1 = sbp_single[i+14].FX_String__c;
            if (sbp_single[i+15].FX_String__c=='0.00') obj13.varM4Y1=''; else  obj13.varM4Y1 = sbp_single[i+15].FX_String__c;
            if (sbp_single[i+16].FX_String__c=='0.00') obj13.varM5Y1=''; else  obj13.varM5Y1 = sbp_single[i+16].FX_String__c;
            if (sbp_single[i+17].FX_String__c=='0.00') obj13.varM6Y1=''; else  obj13.varM6Y1 = sbp_single[i+17].FX_String__c;
            if (sbp_single[i+18].FX_String__c=='0.00') obj13.varM7Y1=''; else  obj13.varM7Y1 = sbp_single[i+18].FX_String__c;
            if (sbp_single[i+19].FX_String__c=='0.00') obj13.varM8Y1=''; else  obj13.varM8Y1 = sbp_single[i+19].FX_String__c;
            if (sbp_single[i+20].FX_String__c=='0.00') obj13.varM9Y1=''; else  obj13.varM9Y1 = sbp_single[i+20].FX_String__c;
            if (sbp_single[i+21].FX_String__c=='0.00') obj13.varM10Y1=''; else  obj13.varM10Y1 = sbp_single[i+21].FX_String__c;
            if (sbp_single[i+22].FX_String__c=='0.00') obj13.varM11Y1=''; else  obj13.varM11Y1 = sbp_single[i+22].FX_String__c;
            if (sbp_single[i+23].FX_String__c=='0.00') obj13.varM12Y1=''; else  obj13.varM12Y1 = sbp_single[i+23].FX_String__c;
            if (sbp_single[i+24].FX_String__c=='0.00') obj13.varM1Y2=''; else  obj13.varM1Y2 = sbp_single[i+24].FX_String__c;
            if (sbp_single[i+25].FX_String__c=='0.00') obj13.varM2Y2=''; else  obj13.varM2Y2 = sbp_single[i+25].FX_String__c;
            if (sbp_single[i+26].FX_String__c=='0.00') obj13.varM3Y2=''; else  obj13.varM3Y2 = sbp_single[i+26].FX_String__c;
            if (sbp_single[i+27].FX_String__c=='0.00') obj13.varM4Y2=''; else  obj13.varM4Y2 = sbp_single[i+27].FX_String__c;
            if (sbp_single[i+28].FX_String__c=='0.00') obj13.varM5Y2=''; else  obj13.varM5Y2 = sbp_single[i+28].FX_String__c;
            if (sbp_single[i+29].FX_String__c=='0.00') obj13.varM6Y2=''; else  obj13.varM6Y2 = sbp_single[i+29].FX_String__c;
            if (sbp_single[i+30].FX_String__c=='0.00') obj13.varM7Y2=''; else  obj13.varM7Y2 = sbp_single[i+30].FX_String__c;
            if (sbp_single[i+31].FX_String__c=='0.00') obj13.varM8Y2=''; else  obj13.varM8Y2 = sbp_single[i+31].FX_String__c;
            if (sbp_single[i+32].FX_String__c=='0.00') obj13.varM9Y2=''; else  obj13.varM9Y2 = sbp_single[i+32].FX_String__c;
            if (sbp_single[i+33].FX_String__c=='0.00') obj13.varM10Y2=''; else  obj13.varM10Y2 = sbp_single[i+33].FX_String__c;
            if (sbp_single[i+34].FX_String__c=='0.00') obj13.varM11Y2=''; else  obj13.varM11Y2 = sbp_single[i+34].FX_String__c;
            if (sbp_single[i+35].FX_String__c=='0.00') obj13.varM12Y2=''; else  obj13.varM12Y2 = sbp_single[i+35].FX_String__c;
            
            sbp_tran_single.add(obj13);
            
            SBPListWrapper obj14= new SBPListWrapper();
            
            obj14.varPrice_RC = 'End of Tooling amortization';
            if (sbp_single[i].ENDTOOLAMOR_String__c=='0.00') obj14.varM1Y0=''; else  obj14.varM1Y0 = sbp_single[i].ENDTOOLAMOR_String__c;
            if (sbp_single[i+1].ENDTOOLAMOR_String__c=='0.00') obj14.varM2Y0=''; else  obj14.varM2Y0 = sbp_single[i+1].ENDTOOLAMOR_String__c;
            if (sbp_single[i+2].ENDTOOLAMOR_String__c=='0.00') obj14.varM3Y0=''; else  obj14.varM3Y0 = sbp_single[i+2].ENDTOOLAMOR_String__c;
            if (sbp_single[i+3].ENDTOOLAMOR_String__c=='0.00') obj14.varM4Y0=''; else  obj14.varM4Y0 = sbp_single[i+3].ENDTOOLAMOR_String__c;
            if (sbp_single[i+4].ENDTOOLAMOR_String__c=='0.00') obj14.varM5Y0=''; else  obj14.varM5Y0 = sbp_single[i+4].ENDTOOLAMOR_String__c;
            if (sbp_single[i+5].ENDTOOLAMOR_String__c=='0.00') obj14.varM6Y0=''; else  obj14.varM6Y0 = sbp_single[i+5].ENDTOOLAMOR_String__c;
            if (sbp_single[i+6].ENDTOOLAMOR_String__c=='0.00') obj14.varM7Y0=''; else  obj14.varM7Y0 = sbp_single[i+6].ENDTOOLAMOR_String__c;
            if (sbp_single[i+7].ENDTOOLAMOR_String__c=='0.00') obj14.varM8Y0=''; else  obj14.varM8Y0 = sbp_single[i+7].ENDTOOLAMOR_String__c;
            if (sbp_single[i+8].ENDTOOLAMOR_String__c=='0.00') obj14.varM9Y0=''; else  obj14.varM9Y0 = sbp_single[i+8].ENDTOOLAMOR_String__c;
            if (sbp_single[i+9].ENDTOOLAMOR_String__c=='0.00') obj14.varM10Y0=''; else  obj14.varM10Y0 = sbp_single[i+9].ENDTOOLAMOR_String__c;
            if (sbp_single[i+10].ENDTOOLAMOR_String__c=='0.00') obj14.varM11Y0=''; else  obj14.varM11Y0 = sbp_single[i+10].ENDTOOLAMOR_String__c;
            if (sbp_single[i+11].ENDTOOLAMOR_String__c=='0.00') obj14.varM12Y0=''; else  obj14.varM12Y0 = sbp_single[i+11].ENDTOOLAMOR_String__c;
            if (sbp_single[i+12].ENDTOOLAMOR_String__c=='0.00') obj14.varM1Y1=''; else  obj14.varM1Y1 = sbp_single[i+12].ENDTOOLAMOR_String__c;
            if (sbp_single[i+13].ENDTOOLAMOR_String__c=='0.00') obj14.varM2Y1=''; else  obj14.varM2Y1 = sbp_single[i+13].ENDTOOLAMOR_String__c;
            if (sbp_single[i+14].ENDTOOLAMOR_String__c=='0.00') obj14.varM3Y1=''; else  obj14.varM3Y1 = sbp_single[i+14].ENDTOOLAMOR_String__c;
            if (sbp_single[i+15].ENDTOOLAMOR_String__c=='0.00') obj14.varM4Y1=''; else  obj14.varM4Y1 = sbp_single[i+15].ENDTOOLAMOR_String__c;
            if (sbp_single[i+16].ENDTOOLAMOR_String__c=='0.00') obj14.varM5Y1=''; else  obj14.varM5Y1 = sbp_single[i+16].ENDTOOLAMOR_String__c;
            if (sbp_single[i+17].ENDTOOLAMOR_String__c=='0.00') obj14.varM6Y1=''; else  obj14.varM6Y1 = sbp_single[i+17].ENDTOOLAMOR_String__c;
            if (sbp_single[i+18].ENDTOOLAMOR_String__c=='0.00') obj14.varM7Y1=''; else  obj14.varM7Y1 = sbp_single[i+18].ENDTOOLAMOR_String__c;
            if (sbp_single[i+19].ENDTOOLAMOR_String__c=='0.00') obj14.varM8Y1=''; else  obj14.varM8Y1 = sbp_single[i+19].ENDTOOLAMOR_String__c;
            if (sbp_single[i+20].ENDTOOLAMOR_String__c=='0.00') obj14.varM9Y1=''; else  obj14.varM9Y1 = sbp_single[i+20].ENDTOOLAMOR_String__c;
            if (sbp_single[i+21].ENDTOOLAMOR_String__c=='0.00') obj14.varM10Y1=''; else  obj14.varM10Y1 = sbp_single[i+21].ENDTOOLAMOR_String__c;
            if (sbp_single[i+22].ENDTOOLAMOR_String__c=='0.00') obj14.varM11Y1=''; else  obj14.varM11Y1 = sbp_single[i+22].ENDTOOLAMOR_String__c;
            if (sbp_single[i+23].ENDTOOLAMOR_String__c=='0.00') obj14.varM12Y1=''; else  obj14.varM12Y1 = sbp_single[i+23].ENDTOOLAMOR_String__c;
            if (sbp_single[i+24].ENDTOOLAMOR_String__c=='0.00') obj14.varM1Y2=''; else  obj14.varM1Y2 = sbp_single[i+24].ENDTOOLAMOR_String__c;
            if (sbp_single[i+25].ENDTOOLAMOR_String__c=='0.00') obj14.varM2Y2=''; else  obj14.varM2Y2 = sbp_single[i+25].ENDTOOLAMOR_String__c;
            if (sbp_single[i+26].ENDTOOLAMOR_String__c=='0.00') obj14.varM3Y2=''; else  obj14.varM3Y2 = sbp_single[i+26].ENDTOOLAMOR_String__c;
            if (sbp_single[i+27].ENDTOOLAMOR_String__c=='0.00') obj14.varM4Y2=''; else  obj14.varM4Y2 = sbp_single[i+27].ENDTOOLAMOR_String__c;
            if (sbp_single[i+28].ENDTOOLAMOR_String__c=='0.00') obj14.varM5Y2=''; else  obj14.varM5Y2 = sbp_single[i+28].ENDTOOLAMOR_String__c;
            if (sbp_single[i+29].ENDTOOLAMOR_String__c=='0.00') obj14.varM6Y2=''; else  obj14.varM6Y2 = sbp_single[i+29].ENDTOOLAMOR_String__c;
            if (sbp_single[i+30].ENDTOOLAMOR_String__c=='0.00') obj14.varM7Y2=''; else  obj14.varM7Y2 = sbp_single[i+30].ENDTOOLAMOR_String__c;
            if (sbp_single[i+31].ENDTOOLAMOR_String__c=='0.00') obj14.varM8Y2=''; else  obj14.varM8Y2 = sbp_single[i+31].ENDTOOLAMOR_String__c;
            if (sbp_single[i+32].ENDTOOLAMOR_String__c=='0.00') obj14.varM9Y2=''; else  obj14.varM9Y2 = sbp_single[i+32].ENDTOOLAMOR_String__c;
            if (sbp_single[i+33].ENDTOOLAMOR_String__c=='0.00') obj14.varM10Y2=''; else  obj14.varM10Y2 = sbp_single[i+33].ENDTOOLAMOR_String__c;
            if (sbp_single[i+34].ENDTOOLAMOR_String__c=='0.00') obj14.varM11Y2=''; else  obj14.varM11Y2 = sbp_single[i+34].ENDTOOLAMOR_String__c;
            if (sbp_single[i+35].ENDTOOLAMOR_String__c=='0.00') obj14.varM12Y2=''; else  obj14.varM12Y2 = sbp_single[i+35].ENDTOOLAMOR_String__c;
            
            sbp_tran_single.add(obj14);
            
            SBPListWrapper obj15= new SBPListWrapper();
            
            obj15.varPrice_RC = 'End of RD&E amortization';
            if (sbp_single[i].ENDRD_EAMOR_String__c=='0.00') obj15.varM1Y0=''; else  obj15.varM1Y0 = sbp_single[i].ENDRD_EAMOR_String__c;
            if (sbp_single[i+1].ENDRD_EAMOR_String__c=='0.00') obj15.varM2Y0=''; else  obj15.varM2Y0 = sbp_single[i+1].ENDRD_EAMOR_String__c;
            if (sbp_single[i+2].ENDRD_EAMOR_String__c=='0.00') obj15.varM3Y0=''; else  obj15.varM3Y0 = sbp_single[i+2].ENDRD_EAMOR_String__c;
            if (sbp_single[i+3].ENDRD_EAMOR_String__c=='0.00') obj15.varM4Y0=''; else  obj15.varM4Y0 = sbp_single[i+3].ENDRD_EAMOR_String__c;
            if (sbp_single[i+4].ENDRD_EAMOR_String__c=='0.00') obj15.varM5Y0=''; else  obj15.varM5Y0 = sbp_single[i+4].ENDRD_EAMOR_String__c;
            if (sbp_single[i+5].ENDRD_EAMOR_String__c=='0.00') obj15.varM6Y0=''; else  obj15.varM6Y0 = sbp_single[i+5].ENDRD_EAMOR_String__c;
            if (sbp_single[i+6].ENDRD_EAMOR_String__c=='0.00') obj15.varM7Y0=''; else  obj15.varM7Y0 = sbp_single[i+6].ENDRD_EAMOR_String__c;
            if (sbp_single[i+7].ENDRD_EAMOR_String__c=='0.00') obj15.varM8Y0=''; else  obj15.varM8Y0 = sbp_single[i+7].ENDRD_EAMOR_String__c;
            if (sbp_single[i+8].ENDRD_EAMOR_String__c=='0.00') obj15.varM9Y0=''; else  obj15.varM9Y0 = sbp_single[i+8].ENDRD_EAMOR_String__c;
            if (sbp_single[i+9].ENDRD_EAMOR_String__c=='0.00') obj15.varM10Y0=''; else  obj15.varM10Y0 = sbp_single[i+9].ENDRD_EAMOR_String__c;
            if (sbp_single[i+10].ENDRD_EAMOR_String__c=='0.00') obj15.varM11Y0=''; else  obj15.varM11Y0 = sbp_single[i+10].ENDRD_EAMOR_String__c;
            if (sbp_single[i+11].ENDRD_EAMOR_String__c=='0.00') obj15.varM12Y0=''; else  obj15.varM12Y0 = sbp_single[i+11].ENDRD_EAMOR_String__c;
            if (sbp_single[i+12].ENDRD_EAMOR_String__c=='0.00') obj15.varM1Y1=''; else  obj15.varM1Y1 = sbp_single[i+12].ENDRD_EAMOR_String__c;
            if (sbp_single[i+13].ENDRD_EAMOR_String__c=='0.00') obj15.varM2Y1=''; else  obj15.varM2Y1 = sbp_single[i+13].ENDRD_EAMOR_String__c;
            if (sbp_single[i+14].ENDRD_EAMOR_String__c=='0.00') obj15.varM3Y1=''; else  obj15.varM3Y1 = sbp_single[i+14].ENDRD_EAMOR_String__c;
            if (sbp_single[i+15].ENDRD_EAMOR_String__c=='0.00') obj15.varM4Y1=''; else  obj15.varM4Y1 = sbp_single[i+15].ENDRD_EAMOR_String__c;
            if (sbp_single[i+16].ENDRD_EAMOR_String__c=='0.00') obj15.varM5Y1=''; else  obj15.varM5Y1 = sbp_single[i+16].ENDRD_EAMOR_String__c;
            if (sbp_single[i+17].ENDRD_EAMOR_String__c=='0.00') obj15.varM6Y1=''; else  obj15.varM6Y1 = sbp_single[i+17].ENDRD_EAMOR_String__c;
            if (sbp_single[i+18].ENDRD_EAMOR_String__c=='0.00') obj15.varM7Y1=''; else  obj15.varM7Y1 = sbp_single[i+18].ENDRD_EAMOR_String__c;
            if (sbp_single[i+19].ENDRD_EAMOR_String__c=='0.00') obj15.varM8Y1=''; else  obj15.varM8Y1 = sbp_single[i+19].ENDRD_EAMOR_String__c;
            if (sbp_single[i+20].ENDRD_EAMOR_String__c=='0.00') obj15.varM9Y1=''; else  obj15.varM9Y1 = sbp_single[i+20].ENDRD_EAMOR_String__c;
            if (sbp_single[i+21].ENDRD_EAMOR_String__c=='0.00') obj15.varM10Y1=''; else  obj15.varM10Y1 = sbp_single[i+21].ENDRD_EAMOR_String__c;
            if (sbp_single[i+22].ENDRD_EAMOR_String__c=='0.00') obj15.varM11Y1=''; else  obj15.varM11Y1 = sbp_single[i+22].ENDRD_EAMOR_String__c;
            if (sbp_single[i+23].ENDRD_EAMOR_String__c=='0.00') obj15.varM12Y1=''; else  obj15.varM12Y1 = sbp_single[i+23].ENDRD_EAMOR_String__c;
            if (sbp_single[i+24].ENDRD_EAMOR_String__c=='0.00') obj15.varM1Y2=''; else  obj15.varM1Y2 = sbp_single[i+24].ENDRD_EAMOR_String__c;
            if (sbp_single[i+25].ENDRD_EAMOR_String__c=='0.00') obj15.varM2Y2=''; else  obj15.varM2Y2 = sbp_single[i+25].ENDRD_EAMOR_String__c;
            if (sbp_single[i+26].ENDRD_EAMOR_String__c=='0.00') obj15.varM3Y2=''; else  obj15.varM3Y2 = sbp_single[i+26].ENDRD_EAMOR_String__c;
            if (sbp_single[i+27].ENDRD_EAMOR_String__c=='0.00') obj15.varM4Y2=''; else  obj15.varM4Y2 = sbp_single[i+27].ENDRD_EAMOR_String__c;
            if (sbp_single[i+28].ENDRD_EAMOR_String__c=='0.00') obj15.varM5Y2=''; else  obj15.varM5Y2 = sbp_single[i+28].ENDRD_EAMOR_String__c;
            if (sbp_single[i+29].ENDRD_EAMOR_String__c=='0.00') obj15.varM6Y2=''; else  obj15.varM6Y2 = sbp_single[i+29].ENDRD_EAMOR_String__c;
            if (sbp_single[i+30].ENDRD_EAMOR_String__c=='0.00') obj15.varM7Y2=''; else  obj15.varM7Y2 = sbp_single[i+30].ENDRD_EAMOR_String__c;
            if (sbp_single[i+31].ENDRD_EAMOR_String__c=='0.00') obj15.varM8Y2=''; else  obj15.varM8Y2 = sbp_single[i+31].ENDRD_EAMOR_String__c;
            if (sbp_single[i+32].ENDRD_EAMOR_String__c=='0.00') obj15.varM9Y2=''; else  obj15.varM9Y2 = sbp_single[i+32].ENDRD_EAMOR_String__c;
            if (sbp_single[i+33].ENDRD_EAMOR_String__c=='0.00') obj15.varM10Y2=''; else  obj15.varM10Y2 = sbp_single[i+33].ENDRD_EAMOR_String__c;
            if (sbp_single[i+34].ENDRD_EAMOR_String__c=='0.00') obj15.varM11Y2=''; else  obj15.varM11Y2 = sbp_single[i+34].ENDRD_EAMOR_String__c;
            if (sbp_single[i+35].ENDRD_EAMOR_String__c=='0.00') obj15.varM12Y2=''; else  obj15.varM12Y2 = sbp_single[i+35].ENDRD_EAMOR_String__c;
            
            sbp_tran_single.add(obj15);
            
            SBPListWrapper obj16= new SBPListWrapper();
            
            obj16.varPrice_RC = 'Interest on RD&E & tooling amort.';
            if (sbp_single[i].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM1Y0=''; else  obj16.varM1Y0 = sbp_single[i].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+1].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM2Y0=''; else  obj16.varM2Y0 = sbp_single[i+1].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+2].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM3Y0=''; else  obj16.varM3Y0 = sbp_single[i+2].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+3].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM4Y0=''; else  obj16.varM4Y0 = sbp_single[i+3].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+4].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM5Y0=''; else  obj16.varM5Y0 = sbp_single[i+4].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+5].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM6Y0=''; else  obj16.varM6Y0 = sbp_single[i+5].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+6].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM7Y0=''; else  obj16.varM7Y0 = sbp_single[i+6].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+7].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM8Y0=''; else  obj16.varM8Y0 = sbp_single[i+7].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+8].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM9Y0=''; else  obj16.varM9Y0 = sbp_single[i+8].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+9].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM10Y0=''; else  obj16.varM10Y0 = sbp_single[i+9].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+10].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM11Y0=''; else  obj16.varM11Y0 = sbp_single[i+10].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+11].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM12Y0=''; else  obj16.varM12Y0 = sbp_single[i+11].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+12].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM1Y1=''; else  obj16.varM1Y1 = sbp_single[i+12].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+13].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM2Y1=''; else  obj16.varM2Y1 = sbp_single[i+13].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+14].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM3Y1=''; else  obj16.varM3Y1 = sbp_single[i+14].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+15].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM4Y1=''; else  obj16.varM4Y1 = sbp_single[i+15].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+16].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM5Y1=''; else  obj16.varM5Y1 = sbp_single[i+16].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+17].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM6Y1=''; else  obj16.varM6Y1 = sbp_single[i+17].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+18].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM7Y1=''; else  obj16.varM7Y1 = sbp_single[i+18].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+19].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM8Y1=''; else  obj16.varM8Y1 = sbp_single[i+19].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+20].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM9Y1=''; else  obj16.varM9Y1 = sbp_single[i+20].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+21].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM10Y1=''; else  obj16.varM10Y1 = sbp_single[i+21].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+22].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM11Y1=''; else  obj16.varM11Y1 = sbp_single[i+22].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+23].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM12Y1=''; else  obj16.varM12Y1 = sbp_single[i+23].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+24].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM1Y2=''; else  obj16.varM1Y2 = sbp_single[i+24].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+25].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM2Y2=''; else  obj16.varM2Y2 = sbp_single[i+25].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+26].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM3Y2=''; else  obj16.varM3Y2 = sbp_single[i+26].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+27].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM4Y2=''; else  obj16.varM4Y2 = sbp_single[i+27].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+28].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM5Y2=''; else  obj16.varM5Y2 = sbp_single[i+28].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+29].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM6Y2=''; else  obj16.varM6Y2 = sbp_single[i+29].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+30].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM7Y2=''; else  obj16.varM7Y2 = sbp_single[i+30].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+31].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM8Y2=''; else  obj16.varM8Y2 = sbp_single[i+31].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+32].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM9Y2=''; else  obj16.varM9Y2 = sbp_single[i+32].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+33].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM10Y2=''; else  obj16.varM10Y2 = sbp_single[i+33].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+34].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM11Y2=''; else  obj16.varM11Y2 = sbp_single[i+34].INTERESTRDE_TOOLAMO_String__c;
            if (sbp_single[i+35].INTERESTRDE_TOOLAMO_String__c=='0.00') obj16.varM12Y2=''; else  obj16.varM12Y2 = sbp_single[i+35].INTERESTRDE_TOOLAMO_String__c;
            
            sbp_tran_single.add(obj16);
            
            SBPListWrapper obj17= new SBPListWrapper();
            
            obj17.varPrice_RC = 'Logistic/Packaging';
            if (sbp_single[i].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM1Y0=''; else  obj17.varM1Y0 = sbp_single[i].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+1].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM2Y0=''; else  obj17.varM2Y0 = sbp_single[i+1].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+2].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM3Y0=''; else  obj17.varM3Y0 = sbp_single[i+2].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+3].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM4Y0=''; else  obj17.varM4Y0 = sbp_single[i+3].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+4].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM5Y0=''; else  obj17.varM5Y0 = sbp_single[i+4].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+5].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM6Y0=''; else  obj17.varM6Y0 = sbp_single[i+5].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+6].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM7Y0=''; else  obj17.varM7Y0 = sbp_single[i+6].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+7].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM8Y0=''; else  obj17.varM8Y0 = sbp_single[i+7].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+8].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM9Y0=''; else  obj17.varM9Y0 = sbp_single[i+8].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+9].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM10Y0=''; else  obj17.varM10Y0 = sbp_single[i+9].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+10].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM11Y0=''; else  obj17.varM11Y0 = sbp_single[i+10].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+11].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM12Y0=''; else  obj17.varM12Y0 = sbp_single[i+11].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+12].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM1Y1=''; else  obj17.varM1Y1 = sbp_single[i+12].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+13].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM2Y1=''; else  obj17.varM2Y1 = sbp_single[i+13].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+14].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM3Y1=''; else  obj17.varM3Y1 = sbp_single[i+14].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+15].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM4Y1=''; else  obj17.varM4Y1 = sbp_single[i+15].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+16].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM5Y1=''; else  obj17.varM5Y1 = sbp_single[i+16].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+17].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM6Y1=''; else  obj17.varM6Y1 = sbp_single[i+17].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+18].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM7Y1=''; else  obj17.varM7Y1 = sbp_single[i+18].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+19].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM8Y1=''; else  obj17.varM8Y1 = sbp_single[i+19].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+20].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM9Y1=''; else  obj17.varM9Y1 = sbp_single[i+20].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+21].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM10Y1=''; else  obj17.varM10Y1 = sbp_single[i+21].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+22].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM11Y1=''; else  obj17.varM11Y1 = sbp_single[i+22].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+23].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM12Y1=''; else  obj17.varM12Y1 = sbp_single[i+23].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+24].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM1Y2=''; else  obj17.varM1Y2 = sbp_single[i+24].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+25].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM2Y2=''; else  obj17.varM2Y2 = sbp_single[i+25].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+26].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM3Y2=''; else  obj17.varM3Y2 = sbp_single[i+26].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+27].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM4Y2=''; else  obj17.varM4Y2 = sbp_single[i+27].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+28].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM5Y2=''; else  obj17.varM5Y2 = sbp_single[i+28].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+29].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM6Y2=''; else  obj17.varM6Y2 = sbp_single[i+29].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+30].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM7Y2=''; else  obj17.varM7Y2 = sbp_single[i+30].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+31].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM8Y2=''; else  obj17.varM8Y2 = sbp_single[i+31].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+32].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM9Y2=''; else  obj17.varM9Y2 = sbp_single[i+32].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+33].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM10Y2=''; else  obj17.varM10Y2 = sbp_single[i+33].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+34].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM11Y2=''; else  obj17.varM11Y2 = sbp_single[i+34].LOGISTIC_PACKAGING_String__c;
            if (sbp_single[i+35].LOGISTIC_PACKAGING_String__c=='0.00') obj17.varM12Y2=''; else  obj17.varM12Y2 = sbp_single[i+35].LOGISTIC_PACKAGING_String__c;
            
            sbp_tran_single.add(obj17);
            
            
            SBPListWrapper obj18= new SBPListWrapper();
            
            obj18.varPrice_RC = 'Other';
            if (sbp_single[i].OTHER_String__c=='0.00') obj18.varM1Y0=''; else  obj18.varM1Y0 = sbp_single[i].OTHER_String__c;
            if (sbp_single[i+1].OTHER_String__c=='0.00') obj18.varM2Y0=''; else  obj18.varM2Y0 = sbp_single[i+1].OTHER_String__c;
            if (sbp_single[i+2].OTHER_String__c=='0.00') obj18.varM3Y0=''; else  obj18.varM3Y0 = sbp_single[i+2].OTHER_String__c;
            if (sbp_single[i+3].OTHER_String__c=='0.00') obj18.varM4Y0=''; else  obj18.varM4Y0 = sbp_single[i+3].OTHER_String__c;
            if (sbp_single[i+4].OTHER_String__c=='0.00') obj18.varM5Y0=''; else  obj18.varM5Y0 = sbp_single[i+4].OTHER_String__c;
            if (sbp_single[i+5].OTHER_String__c=='0.00') obj18.varM6Y0=''; else  obj18.varM6Y0 = sbp_single[i+5].OTHER_String__c;
            if (sbp_single[i+6].OTHER_String__c=='0.00') obj18.varM7Y0=''; else  obj18.varM7Y0 = sbp_single[i+6].OTHER_String__c;
            if (sbp_single[i+7].OTHER_String__c=='0.00') obj18.varM8Y0=''; else  obj18.varM8Y0 = sbp_single[i+7].OTHER_String__c;
            if (sbp_single[i+8].OTHER_String__c=='0.00') obj18.varM9Y0=''; else  obj18.varM9Y0 = sbp_single[i+8].OTHER_String__c;
            if (sbp_single[i+9].OTHER_String__c=='0.00') obj18.varM10Y0=''; else  obj18.varM10Y0 = sbp_single[i+9].OTHER_String__c;
            if (sbp_single[i+10].OTHER_String__c=='0.00') obj18.varM11Y0=''; else  obj18.varM11Y0 = sbp_single[i+10].OTHER_String__c;
            if (sbp_single[i+11].OTHER_String__c=='0.00') obj18.varM12Y0=''; else  obj18.varM12Y0 = sbp_single[i+11].OTHER_String__c;
            if (sbp_single[i+12].OTHER_String__c=='0.00') obj18.varM1Y1=''; else  obj18.varM1Y1 = sbp_single[i+12].OTHER_String__c;
            if (sbp_single[i+13].OTHER_String__c=='0.00') obj18.varM2Y1=''; else  obj18.varM2Y1 = sbp_single[i+13].OTHER_String__c;
            if (sbp_single[i+14].OTHER_String__c=='0.00') obj18.varM3Y1=''; else  obj18.varM3Y1 = sbp_single[i+14].OTHER_String__c;
            if (sbp_single[i+15].OTHER_String__c=='0.00') obj18.varM4Y1=''; else  obj18.varM4Y1 = sbp_single[i+15].OTHER_String__c;
            if (sbp_single[i+16].OTHER_String__c=='0.00') obj18.varM5Y1=''; else  obj18.varM5Y1 = sbp_single[i+16].OTHER_String__c;
            if (sbp_single[i+17].OTHER_String__c=='0.00') obj18.varM6Y1=''; else  obj18.varM6Y1 = sbp_single[i+17].OTHER_String__c;
            if (sbp_single[i+18].OTHER_String__c=='0.00') obj18.varM7Y1=''; else  obj18.varM7Y1 = sbp_single[i+18].OTHER_String__c;
            if (sbp_single[i+19].OTHER_String__c=='0.00') obj18.varM8Y1=''; else  obj18.varM8Y1 = sbp_single[i+19].OTHER_String__c;
            if (sbp_single[i+20].OTHER_String__c=='0.00') obj18.varM9Y1=''; else  obj18.varM9Y1 = sbp_single[i+20].OTHER_String__c;
            if (sbp_single[i+21].OTHER_String__c=='0.00') obj18.varM10Y1=''; else  obj18.varM10Y1 = sbp_single[i+21].OTHER_String__c;
            if (sbp_single[i+22].OTHER_String__c=='0.00') obj18.varM11Y1=''; else  obj18.varM11Y1 = sbp_single[i+22].OTHER_String__c;
            if (sbp_single[i+23].OTHER_String__c=='0.00') obj18.varM12Y1=''; else  obj18.varM12Y1 = sbp_single[i+23].OTHER_String__c;
            if (sbp_single[i+24].OTHER_String__c=='0.00') obj18.varM1Y2=''; else  obj18.varM1Y2 = sbp_single[i+24].OTHER_String__c;
            if (sbp_single[i+25].OTHER_String__c=='0.00') obj18.varM2Y2=''; else  obj18.varM2Y2 = sbp_single[i+25].OTHER_String__c;
            if (sbp_single[i+26].OTHER_String__c=='0.00') obj18.varM3Y2=''; else  obj18.varM3Y2 = sbp_single[i+26].OTHER_String__c;
            if (sbp_single[i+27].OTHER_String__c=='0.00') obj18.varM4Y2=''; else  obj18.varM4Y2 = sbp_single[i+27].OTHER_String__c;
            if (sbp_single[i+28].OTHER_String__c=='0.00') obj18.varM5Y2=''; else  obj18.varM5Y2 = sbp_single[i+28].OTHER_String__c;
            if (sbp_single[i+29].OTHER_String__c=='0.00') obj18.varM6Y2=''; else  obj18.varM6Y2 = sbp_single[i+29].OTHER_String__c;
            if (sbp_single[i+30].OTHER_String__c=='0.00') obj18.varM7Y2=''; else  obj18.varM7Y2 = sbp_single[i+30].OTHER_String__c;
            if (sbp_single[i+31].OTHER_String__c=='0.00') obj18.varM8Y2=''; else  obj18.varM8Y2 = sbp_single[i+31].OTHER_String__c;
            if (sbp_single[i+32].OTHER_String__c=='0.00') obj18.varM9Y2=''; else  obj18.varM9Y2 = sbp_single[i+32].OTHER_String__c;
            if (sbp_single[i+33].OTHER_String__c=='0.00') obj18.varM10Y2=''; else  obj18.varM10Y2 = sbp_single[i+33].OTHER_String__c;
            if (sbp_single[i+34].OTHER_String__c=='0.00') obj18.varM11Y2=''; else  obj18.varM11Y2 = sbp_single[i+34].OTHER_String__c;
            if (sbp_single[i+35].OTHER_String__c=='0.00') obj18.varM12Y2=''; else  obj18.varM12Y2 = sbp_single[i+35].OTHER_String__c;
            
            sbp_tran_single.add(obj18);
             
            system.debug ('TransposetoWrapper - sbp_tran_single ' + sbp_tran_single);
    
    
    }
    
    public void TransposetoWrapperAll(){
        
        if(!sbp_all.isEmpty()){
            
            system.debug ('TransposetoWrapper - sbp_all ' + sbp_all);
            
            sbp_tran_all = new List<SBPListWrapper>(); 
            
            SBPListWrapper obj1= new SBPListWrapper();
            
            obj1.varPrice_RC = 'Effective Date';
            obj1.varM1Y0 = '1';
            obj1.varM2Y0 = '1';
            obj1.varM3Y0 = '1';
            obj1.varM4Y0 = '1';
            obj1.varM5Y0 = '1';
            obj1.varM6Y0 = '1';
            obj1.varM7Y0 = '1';
            obj1.varM8Y0 = '1';
            obj1.varM9Y0 = '1';
            obj1.varM10Y0 = '1';
            obj1.varM11Y0 = '1';
            obj1.varM12Y0 = '1';
            obj1.varM1Y1 = '1';
            obj1.varM2Y1 = '1';
            obj1.varM3Y1 = '1';
            obj1.varM4Y1 = '1';
            obj1.varM5Y1 = '1';
            obj1.varM6Y1 = '1';
            obj1.varM7Y1 = '1';
            obj1.varM8Y1 = '1';
            obj1.varM9Y1 = '1';
            obj1.varM10Y1 = '1';
            obj1.varM11Y1 = '1';
            obj1.varM12Y1 = '1';
            obj1.varM1Y2 = '1';
            obj1.varM2Y2 = '1';
            obj1.varM3Y2 = '1';
            obj1.varM4Y2 = '1';
            obj1.varM5Y2 = '1';
            obj1.varM6Y2 = '1';
            obj1.varM7Y2 = '1';
            obj1.varM8Y2 = '1';
            obj1.varM9Y2 = '1';
            obj1.varM10Y2 = '1';
            obj1.varM11Y2 = '1';
            obj1.varM12Y2 = '1';
            
            sbp_tran_all.add(obj1);
            
            SBPListWrapper obj2= new SBPListWrapper();
            
            obj2.varPrice_RC = 'Pure Price Contractual';
            /*obj2.varM1Y0 = '0.00';
            obj2.varM2Y0 = '0.00';
            obj2.varM3Y0 = '0.00';
            obj2.varM4Y0 = '0.00';
            obj2.varM5Y0 = '0.00';
            obj2.varM6Y0 = '0.00';
            obj2.varM7Y0 = '0.00';
            obj2.varM8Y0 = '0.00';
            obj2.varM9Y0 = '0.00';
            obj2.varM10Y0 = '0.00';
            obj2.varM11Y0 = '0.00';
            obj2.varM12Y0 = '0.00';
            obj2.varM1Y1 = '0.00';
            obj2.varM2Y1 = '0.00';
            obj2.varM3Y1 = '0.00';
            obj2.varM4Y1 = '0.00';
            obj2.varM5Y1 = '0.00';
            obj2.varM6Y1 = '0.00';
            obj2.varM7Y1 = '0.00';
            obj2.varM8Y1 = '0.00';
            obj2.varM9Y1 = '0.00';
            obj2.varM10Y1 = '0.00';
            obj2.varM11Y1 = '0.00';
            obj2.varM12Y1 = '0.00';
            obj2.varM1Y2 = '0.00';
            obj2.varM2Y2 = '0.00';
            obj2.varM3Y2 = '0.00';
            obj2.varM4Y2 = '0.00';
            obj2.varM5Y2 = '0.00';
            obj2.varM6Y2 = '0.00';
            obj2.varM7Y2 = '0.00';
            obj2.varM8Y2 = '0.00';
            obj2.varM9Y2 = '0.00';
            obj2.varM10Y2 = '0.00';
            obj2.varM11Y2 = '0.00';
            obj2.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj2);
            
            SBPListWrapper obj3= new SBPListWrapper();
            
            obj3.varPrice_RC = 'Pure Price Biz Win';
            /*obj3.varM1Y0 = '0.00';
            obj3.varM2Y0 = '0.00';
            obj3.varM3Y0 = '0.00';
            obj3.varM4Y0 = '0.00';
            obj3.varM5Y0 = '0.00';
            obj3.varM6Y0 = '0.00';
            obj3.varM7Y0 = '0.00';
            obj3.varM8Y0 = '0.00';
            obj3.varM9Y0 = '0.00';
            obj3.varM10Y0 = '0.00';
            obj3.varM11Y0 = '0.00';
            obj3.varM12Y0 = '0.00';
            obj3.varM1Y1 = '0.00';
            obj3.varM2Y1 = '0.00';
            obj3.varM3Y1 = '0.00';
            obj3.varM4Y1 = '0.00';
            obj3.varM5Y1 = '0.00';
            obj3.varM6Y1 = '0.00';
            obj3.varM7Y1 = '0.00';
            obj3.varM8Y1 = '0.00';
            obj3.varM9Y1 = '0.00';
            obj3.varM10Y1 = '0.00';
            obj3.varM11Y1 = '0.00';
            obj3.varM12Y1 = '0.00';
            obj3.varM1Y2 = '0.00';
            obj3.varM2Y2 = '0.00';
            obj3.varM3Y2 = '0.00';
            obj3.varM4Y2 = '0.00';
            obj3.varM5Y2 = '0.00';
            obj3.varM6Y2 = '0.00';
            obj3.varM7Y2 = '0.00';
            obj3.varM8Y2 = '0.00';
            obj3.varM9Y2 = '0.00';
            obj3.varM10Y2 = '0.00';
            obj3.varM11Y2 = '0.00';
            obj3.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj3);
            
            SBPListWrapper obj4= new SBPListWrapper();
            
            obj4.varPrice_RC = 'VE/HLRR PT';
            /*obj4.varM1Y0 = '0.00';
            obj4.varM2Y0 = '0.00';
            obj4.varM3Y0 = '0.00';
            obj4.varM4Y0 = '0.00';
            obj4.varM5Y0 = '0.00';
            obj4.varM6Y0 = '0.00';
            obj4.varM7Y0 = '0.00';
            obj4.varM8Y0 = '0.00';
            obj4.varM9Y0 = '0.00';
            obj4.varM10Y0 = '0.00';
            obj4.varM11Y0 = '0.00';
            obj4.varM12Y0 = '0.00';
            obj4.varM1Y1 = '0.00';
            obj4.varM2Y1 = '0.00';
            obj4.varM3Y1 = '0.00';
            obj4.varM4Y1 = '0.00';
            obj4.varM5Y1 = '0.00';
            obj4.varM6Y1 = '0.00';
            obj4.varM7Y1 = '0.00';
            obj4.varM8Y1 = '0.00';
            obj4.varM9Y1 = '0.00';
            obj4.varM10Y1 = '0.00';
            obj4.varM11Y1 = '0.00';
            obj4.varM12Y1 = '0.00';
            obj4.varM1Y2 = '0.00';
            obj4.varM2Y2 = '0.00';
            obj4.varM3Y2 = '0.00';
            obj4.varM4Y2 = '0.00';
            obj4.varM5Y2 = '0.00';
            obj4.varM6Y2 = '0.00';
            obj4.varM7Y2 = '0.00';
            obj4.varM8Y2 = '0.00';
            obj4.varM9Y2 = '0.00';
            obj4.varM10Y2 = '0.00';
            obj4.varM11Y2 = '0.00';
            obj4.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj4);
            
            SBPListWrapper obj5= new SBPListWrapper();
            
            obj5.varPrice_RC = 'Nickel';
            /*obj5.varM1Y0 = '0.00';
            obj5.varM2Y0 = '0.00';
            obj5.varM3Y0 = '0.00';
            obj5.varM4Y0 = '0.00';
            obj5.varM5Y0 = '0.00';
            obj5.varM6Y0 = '0.00';
            obj5.varM7Y0 = '0.00';
            obj5.varM8Y0 = '0.00';
            obj5.varM9Y0 = '0.00';
            obj5.varM10Y0 = '0.00';
            obj5.varM11Y0 = '0.00';
            obj5.varM12Y0 = '0.00';
            obj5.varM1Y1 = '0.00';
            obj5.varM2Y1 = '0.00';
            obj5.varM3Y1 = '0.00';
            obj5.varM4Y1 = '0.00';
            obj5.varM5Y1 = '0.00';
            obj5.varM6Y1 = '0.00';
            obj5.varM7Y1 = '0.00';
            obj5.varM8Y1 = '0.00';
            obj5.varM9Y1 = '0.00';
            obj5.varM10Y1 = '0.00';
            obj5.varM11Y1 = '0.00';
            obj5.varM12Y1 = '0.00';
            obj5.varM1Y2 = '0.00';
            obj5.varM2Y2 = '0.00';
            obj5.varM3Y2 = '0.00';
            obj5.varM4Y2 = '0.00';
            obj5.varM5Y2 = '0.00';
            obj5.varM6Y2 = '0.00';
            obj5.varM7Y2 = '0.00';
            obj5.varM8Y2 = '0.00';
            obj5.varM9Y2 = '0.00';
            obj5.varM10Y2 = '0.00';
            obj5.varM11Y2 = '0.00';
            obj5.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj5);
            
            SBPListWrapper obj6= new SBPListWrapper();
            
            obj6.varPrice_RC = 'Aluminium';
            /*obj6.varM1Y0 = '0.00';
            obj6.varM2Y0 = '0.00';
            obj6.varM3Y0 = '0.00';
            obj6.varM4Y0 = '0.00';
            obj6.varM5Y0 = '0.00';
            obj6.varM6Y0 = '0.00';
            obj6.varM7Y0 = '0.00';
            obj6.varM8Y0 = '0.00';
            obj6.varM9Y0 = '0.00';
            obj6.varM10Y0 = '0.00';
            obj6.varM11Y0 = '0.00';
            obj6.varM12Y0 = '0.00';
            obj6.varM1Y1 = '0.00';
            obj6.varM2Y1 = '0.00';
            obj6.varM3Y1 = '0.00';
            obj6.varM4Y1 = '0.00';
            obj6.varM5Y1 = '0.00';
            obj6.varM6Y1 = '0.00';
            obj6.varM7Y1 = '0.00';
            obj6.varM8Y1 = '0.00';
            obj6.varM9Y1 = '0.00';
            obj6.varM10Y1 = '0.00';
            obj6.varM11Y1 = '0.00';
            obj6.varM12Y1 = '0.00';
            obj6.varM1Y2 = '0.00';
            obj6.varM2Y2 = '0.00';
            obj6.varM3Y2 = '0.00';
            obj6.varM4Y2 = '0.00';
            obj6.varM5Y2 = '0.00';
            obj6.varM6Y2 = '0.00';
            obj6.varM7Y2 = '0.00';
            obj6.varM8Y2 = '0.00';
            obj6.varM9Y2 = '0.00';
            obj6.varM10Y2 = '0.00';
            obj6.varM11Y2 = '0.00';
            obj6.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj6);
            
            SBPListWrapper obj7= new SBPListWrapper();
            
            obj7.varPrice_RC = 'Molybdenum';
            /*obj7.varM1Y0 = '0.00';
            obj7.varM2Y0 = '0.00';
            obj7.varM3Y0 = '0.00';
            obj7.varM4Y0 = '0.00';
            obj7.varM5Y0 = '0.00';
            obj7.varM6Y0 = '0.00';
            obj7.varM7Y0 = '0.00';
            obj7.varM8Y0 = '0.00';
            obj7.varM9Y0 = '0.00';
            obj7.varM10Y0 = '0.00';
            obj7.varM11Y0 = '0.00';
            obj7.varM12Y0 = '0.00';
            obj7.varM1Y1 = '0.00';
            obj7.varM2Y1 = '0.00';
            obj7.varM3Y1 = '0.00';
            obj7.varM4Y1 = '0.00';
            obj7.varM5Y1 = '0.00';
            obj7.varM6Y1 = '0.00';
            obj7.varM7Y1 = '0.00';
            obj7.varM8Y1 = '0.00';
            obj7.varM9Y1 = '0.00';
            obj7.varM10Y1 = '0.00';
            obj7.varM11Y1 = '0.00';
            obj7.varM12Y1 = '0.00';
            obj7.varM1Y2 = '0.00';
            obj7.varM2Y2 = '0.00';
            obj7.varM3Y2 = '0.00';
            obj7.varM4Y2 = '0.00';
            obj7.varM5Y2 = '0.00';
            obj7.varM6Y2 = '0.00';
            obj7.varM7Y2 = '0.00';
            obj7.varM8Y2 = '0.00';
            obj7.varM9Y2 = '0.00';
            obj7.varM10Y2 = '0.00';
            obj7.varM11Y2 = '0.00';
            obj7.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj7);
            
            SBPListWrapper obj8= new SBPListWrapper();
            
            obj8.varPrice_RC = 'Other metals';
            /*obj8.varM1Y0 = '0.00';
            obj8.varM2Y0 = '0.00';
            obj8.varM3Y0 = '0.00';
            obj8.varM4Y0 = '0.00';
            obj8.varM5Y0 = '0.00';
            obj8.varM6Y0 = '0.00';
            obj8.varM7Y0 = '0.00';
            obj8.varM8Y0 = '0.00';
            obj8.varM9Y0 = '0.00';
            obj8.varM10Y0 = '0.00';
            obj8.varM11Y0 = '0.00';
            obj8.varM12Y0 = '0.00';
            obj8.varM1Y1 = '0.00';
            obj8.varM2Y1 = '0.00';
            obj8.varM3Y1 = '0.00';
            obj8.varM4Y1 = '0.00';
            obj8.varM5Y1 = '0.00';
            obj8.varM6Y1 = '0.00';
            obj8.varM7Y1 = '0.00';
            obj8.varM8Y1 = '0.00';
            obj8.varM9Y1 = '0.00';
            obj8.varM10Y1 = '0.00';
            obj8.varM11Y1 = '0.00';
            obj8.varM12Y1 = '0.00';
            obj8.varM1Y2 = '0.00';
            obj8.varM2Y2 = '0.00';
            obj8.varM3Y2 = '0.00';
            obj8.varM4Y2 = '0.00';
            obj8.varM5Y2 = '0.00';
            obj8.varM6Y2 = '0.00';
            obj8.varM7Y2 = '0.00';
            obj8.varM8Y2 = '0.00';
            obj8.varM9Y2 = '0.00';
            obj8.varM10Y2 = '0.00';
            obj8.varM11Y2 = '0.00';
            obj8.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj8);
            
            SBPListWrapper obj9= new SBPListWrapper();
            
            obj9.varPrice_RC = 'Eng. Changes';
            /*obj9.varM1Y0 = '0.00';
            obj9.varM2Y0 = '0.00';
            obj9.varM3Y0 = '0.00';
            obj9.varM4Y0 = '0.00';
            obj9.varM5Y0 = '0.00';
            obj9.varM6Y0 = '0.00';
            obj9.varM7Y0 = '0.00';
            obj9.varM8Y0 = '0.00';
            obj9.varM9Y0 = '0.00';
            obj9.varM10Y0 = '0.00';
            obj9.varM11Y0 = '0.00';
            obj9.varM12Y0 = '0.00';
            obj9.varM1Y1 = '0.00';
            obj9.varM2Y1 = '0.00';
            obj9.varM3Y1 = '0.00';
            obj9.varM4Y1 = '0.00';
            obj9.varM5Y1 = '0.00';
            obj9.varM6Y1 = '0.00';
            obj9.varM7Y1 = '0.00';
            obj9.varM8Y1 = '0.00';
            obj9.varM9Y1 = '0.00';
            obj9.varM10Y1 = '0.00';
            obj9.varM11Y1 = '0.00';
            obj9.varM12Y1 = '0.00';
            obj9.varM1Y2 = '0.00';
            obj9.varM2Y2 = '0.00';
            obj9.varM3Y2 = '0.00';
            obj9.varM4Y2 = '0.00';
            obj9.varM5Y2 = '0.00';
            obj9.varM6Y2 = '0.00';
            obj9.varM7Y2 = '0.00';
            obj9.varM8Y2 = '0.00';
            obj9.varM9Y2 = '0.00';
            obj9.varM10Y2 = '0.00';
            obj9.varM11Y2 = '0.00';
            obj9.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj9);
            
            SBPListWrapper obj11= new SBPListWrapper();
            
            obj11.varPrice_RC = 'FX';
            /*obj11.varM1Y0 = '0.00';
            obj11.varM2Y0 = '0.00';
            obj11.varM3Y0 = '0.00';
            obj11.varM4Y0 = '0.00';
            obj11.varM5Y0 = '0.00';
            obj11.varM6Y0 = '0.00';
            obj11.varM7Y0 = '0.00';
            obj11.varM8Y0 = '0.00';
            obj11.varM9Y0 = '0.00';
            obj11.varM10Y0 = '0.00';
            obj11.varM11Y0 = '0.00';
            obj11.varM12Y0 = '0.00';
            obj11.varM1Y1 = '0.00';
            obj11.varM2Y1 = '0.00';
            obj11.varM3Y1 = '0.00';
            obj11.varM4Y1 = '0.00';
            obj11.varM5Y1 = '0.00';
            obj11.varM6Y1 = '0.00';
            obj11.varM7Y1 = '0.00';
            obj11.varM8Y1 = '0.00';
            obj11.varM9Y1 = '0.00';
            obj11.varM10Y1 = '0.00';
            obj11.varM11Y1 = '0.00';
            obj11.varM12Y1 = '0.00';
            obj11.varM1Y2 = '0.00';
            obj11.varM2Y2 = '0.00';
            obj11.varM3Y2 = '0.00';
            obj11.varM4Y2 = '0.00';
            obj11.varM5Y2 = '0.00';
            obj11.varM6Y2 = '0.00';
            obj11.varM7Y2 = '0.00';
            obj11.varM8Y2 = '0.00';
            obj11.varM9Y2 = '0.00';
            obj11.varM10Y2 = '0.00';
            obj11.varM11Y2 = '0.00';
            obj11.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj11);
            
            SBPListWrapper obj12= new SBPListWrapper();
            
            obj12.varPrice_RC = 'End of Tooling amortization';
            /*obj12.varM1Y0 = '0.00';
            obj12.varM2Y0 = '0.00';
            obj12.varM3Y0 = '0.00';
            obj12.varM4Y0 = '0.00';
            obj12.varM5Y0 = '0.00';
            obj12.varM6Y0 = '0.00';
            obj12.varM7Y0 = '0.00';
            obj12.varM8Y0 = '0.00';
            obj12.varM9Y0 = '0.00';
            obj12.varM10Y0 = '0.00';
            obj12.varM11Y0 = '0.00';
            obj12.varM12Y0 = '0.00';
            obj12.varM1Y1 = '0.00';
            obj12.varM2Y1 = '0.00';
            obj12.varM3Y1 = '0.00';
            obj12.varM4Y1 = '0.00';
            obj12.varM5Y1 = '0.00';
            obj12.varM6Y1 = '0.00';
            obj12.varM7Y1 = '0.00';
            obj12.varM8Y1 = '0.00';
            obj12.varM9Y1 = '0.00';
            obj12.varM10Y1 = '0.00';
            obj12.varM11Y1 = '0.00';
            obj12.varM12Y1 = '0.00';
            obj12.varM1Y2 = '0.00';
            obj12.varM2Y2 = '0.00';
            obj12.varM3Y2 = '0.00';
            obj12.varM4Y2 = '0.00';
            obj12.varM5Y2 = '0.00';
            obj12.varM6Y2 = '0.00';
            obj12.varM7Y2 = '0.00';
            obj12.varM8Y2 = '0.00';
            obj12.varM9Y2 = '0.00';
            obj12.varM10Y2 = '0.00';
            obj12.varM11Y2 = '0.00';
            obj12.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj12);
            
            SBPListWrapper obj13= new SBPListWrapper();
            
            obj13.varPrice_RC = 'End of RD&E amortization';
            /*obj13.varM1Y0 = '0.00';
            obj13.varM2Y0 = '0.00';
            obj13.varM3Y0 = '0.00';
            obj13.varM4Y0 = '0.00';
            obj13.varM5Y0 = '0.00';
            obj13.varM6Y0 = '0.00';
            obj13.varM7Y0 = '0.00';
            obj13.varM8Y0 = '0.00';
            obj13.varM9Y0 = '0.00';
            obj13.varM10Y0 = '0.00';
            obj13.varM11Y0 = '0.00';
            obj13.varM12Y0 = '0.00';
            obj13.varM1Y1 = '0.00';
            obj13.varM2Y1 = '0.00';
            obj13.varM3Y1 = '0.00';
            obj13.varM4Y1 = '0.00';
            obj13.varM5Y1 = '0.00';
            obj13.varM6Y1 = '0.00';
            obj13.varM7Y1 = '0.00';
            obj13.varM8Y1 = '0.00';
            obj13.varM9Y1 = '0.00';
            obj13.varM10Y1 = '0.00';
            obj13.varM11Y1 = '0.00';
            obj13.varM12Y1 = '0.00';
            obj13.varM1Y2 = '0.00';
            obj13.varM2Y2 = '0.00';
            obj13.varM3Y2 = '0.00';
            obj13.varM4Y2 = '0.00';
            obj13.varM5Y2 = '0.00';
            obj13.varM6Y2 = '0.00';
            obj13.varM7Y2 = '0.00';
            obj13.varM8Y2 = '0.00';
            obj13.varM9Y2 = '0.00';
            obj13.varM10Y2 = '0.00';
            obj13.varM11Y2 = '0.00';
            obj13.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj13);
            
            SBPListWrapper obj14= new SBPListWrapper();
            
            obj14.varPrice_RC = 'Interest on RD&E & tooling amort.';
            /*obj14.varM1Y0 = '0.00';
            obj14.varM2Y0 = '0.00';
            obj14.varM3Y0 = '0.00';
            obj14.varM4Y0 = '0.00';
            obj14.varM5Y0 = '0.00';
            obj14.varM6Y0 = '0.00';
            obj14.varM7Y0 = '0.00';
            obj14.varM8Y0 = '0.00';
            obj14.varM9Y0 = '0.00';
            obj14.varM10Y0 = '0.00';
            obj14.varM11Y0 = '0.00';
            obj14.varM12Y0 = '0.00';
            obj14.varM1Y1 = '0.00';
            obj14.varM2Y1 = '0.00';
            obj14.varM3Y1 = '0.00';
            obj14.varM4Y1 = '0.00';
            obj14.varM5Y1 = '0.00';
            obj14.varM6Y1 = '0.00';
            obj14.varM7Y1 = '0.00';
            obj14.varM8Y1 = '0.00';
            obj14.varM9Y1 = '0.00';
            obj14.varM10Y1 = '0.00';
            obj14.varM11Y1 = '0.00';
            obj14.varM12Y1 = '0.00';
            obj14.varM1Y2 = '0.00';
            obj14.varM2Y2 = '0.00';
            obj14.varM3Y2 = '0.00';
            obj14.varM4Y2 = '0.00';
            obj14.varM5Y2 = '0.00';
            obj14.varM6Y2 = '0.00';
            obj14.varM7Y2 = '0.00';
            obj14.varM8Y2 = '0.00';
            obj14.varM9Y2 = '0.00';
            obj14.varM10Y2 = '0.00';
            obj14.varM11Y2 = '0.00';
            obj14.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj14);
            
            SBPListWrapper obj15= new SBPListWrapper();
            
            obj15.varPrice_RC = 'Logistic/Packaging';
            /*obj15.varM1Y0 = '0.00';
            obj15.varM2Y0 = '0.00';
            obj15.varM3Y0 = '0.00';
            obj15.varM4Y0 = '0.00';
            obj15.varM5Y0 = '0.00';
            obj15.varM6Y0 = '0.00';
            obj15.varM7Y0 = '0.00';
            obj15.varM8Y0 = '0.00';
            obj15.varM9Y0 = '0.00';
            obj15.varM10Y0 = '0.00';
            obj15.varM11Y0 = '0.00';
            obj15.varM12Y0 = '0.00';
            obj15.varM1Y1 = '0.00';
            obj15.varM2Y1 = '0.00';
            obj15.varM3Y1 = '0.00';
            obj15.varM4Y1 = '0.00';
            obj15.varM5Y1 = '0.00';
            obj15.varM6Y1 = '0.00';
            obj15.varM7Y1 = '0.00';
            obj15.varM8Y1 = '0.00';
            obj15.varM9Y1 = '0.00';
            obj15.varM10Y1 = '0.00';
            obj15.varM11Y1 = '0.00';
            obj15.varM12Y1 = '0.00';
            obj15.varM1Y2 = '0.00';
            obj15.varM2Y2 = '0.00';
            obj15.varM3Y2 = '0.00';
            obj15.varM4Y2 = '0.00';
            obj15.varM5Y2 = '0.00';
            obj15.varM6Y2 = '0.00';
            obj15.varM7Y2 = '0.00';
            obj15.varM8Y2 = '0.00';
            obj15.varM9Y2 = '0.00';
            obj15.varM10Y2 = '0.00';
            obj15.varM11Y2 = '0.00';
            obj15.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj15);
            
            SBPListWrapper obj16= new SBPListWrapper();
            
            obj16.varPrice_RC = 'Other';
           /* obj16.varM1Y0 = '0.00';
            obj16.varM2Y0 = '0.00';
            obj16.varM3Y0 = '0.00';
            obj16.varM4Y0 = '0.00';
            obj16.varM5Y0 = '0.00';
            obj16.varM6Y0 = '0.00';
            obj16.varM7Y0 = '0.00';
            obj16.varM8Y0 = '0.00';
            obj16.varM9Y0 = '0.00';
            obj16.varM10Y0 = '0.00';
            obj16.varM11Y0 = '0.00';
            obj16.varM12Y0 = '0.00';
            obj16.varM1Y1 = '0.00';
            obj16.varM2Y1 = '0.00';
            obj16.varM3Y1 = '0.00';
            obj16.varM4Y1 = '0.00';
            obj16.varM5Y1 = '0.00';
            obj16.varM6Y1 = '0.00';
            obj16.varM7Y1 = '0.00';
            obj16.varM8Y1 = '0.00';
            obj16.varM9Y1 = '0.00';
            obj16.varM10Y1 = '0.00';
            obj16.varM11Y1 = '0.00';
            obj16.varM12Y1 = '0.00';
            obj16.varM1Y2 = '0.00';
            obj16.varM2Y2 = '0.00';
            obj16.varM3Y2 = '0.00';
            obj16.varM4Y2 = '0.00';
            obj16.varM5Y2 = '0.00';
            obj16.varM6Y2 = '0.00';
            obj16.varM7Y2 = '0.00';
            obj16.varM8Y2 = '0.00';
            obj16.varM9Y2 = '0.00';
            obj16.varM10Y2 = '0.00';
            obj16.varM11Y2 = '0.00';
            obj16.varM12Y2 = '0.00';*/
            
            sbp_tran_all.add(obj16);
            
             system.debug ('TransposetoWrapper - sbp_tran_all' + sbp_tran_all);
        
        }
    }
    
    
    public void TransposeFromWrapper(){
    
        //Integer i=0;
    
        if(!sbp_tran_single.isEmpty()){
        
            system.debug ('TransposeFromWrapper - sbp_tran_single ' + sbp_tran_single);
            system.debug ('TransposeFromWrapper - sbp_single_past.size() ' + sbp_single_past.size());
            system.debug ('TransposeFromWrapper - sbp_single_forecast.size() ' + sbp_single_forecast.size());
            
            for(SBPListWrapper sbpts: sbp_tran_single){
            
                for (Integer i = 0; i < sbp_single_past.size(); i++) {
                        
                    String monthvalue='';
                        
                    if(i==0)monthvalue=sbpts.varM1Y0;
                    if(i==1)monthvalue=sbpts.varM2Y0;
                    if(i==2)monthvalue=sbpts.varM3Y0;
                    if(i==3)monthvalue=sbpts.varM4Y0;
                    if(i==4)monthvalue=sbpts.varM5Y0;
                    if(i==5)monthvalue=sbpts.varM6Y0;
                    if(i==6)monthvalue=sbpts.varM7Y0;
                    if(i==7)monthvalue=sbpts.varM8Y0;
                    if(i==8)monthvalue=sbpts.varM9Y0;
                    if(i==9)monthvalue=sbpts.varM10Y0;
                    if(i==10)monthvalue=sbpts.varM11Y0;
                    if(i==11)monthvalue=sbpts.varM12Y0;
                    if(i==12)monthvalue=sbpts.varM1Y1;
                    if(i==13)monthvalue=sbpts.varM2Y1;
                    if(i==14)monthvalue=sbpts.varM3Y1;
                    if(i==15)monthvalue=sbpts.varM4Y1;
                    if(i==16)monthvalue=sbpts.varM5Y1;
                    if(i==17)monthvalue=sbpts.varM6Y1;
                    if(i==18)monthvalue=sbpts.varM7Y1;
                    if(i==19)monthvalue=sbpts.varM8Y1;
                    if(i==20)monthvalue=sbpts.varM9Y1;
                    if(i==21)monthvalue=sbpts.varM10Y1;
                    if(i==22)monthvalue=sbpts.varM11Y1;
                    if(i==23)monthvalue=sbpts.varM12Y1;
                        
                    if(sbpts.varPrice_RC=='Pure Price Contractual')sbp_single_past[i].PURE_PRICE_CONTRACTUAL_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Pure Price Biz Win')sbp_single_past[i].PURE_PRICE_BIZ_WINS_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='VE/HLRR PT')sbp_single_past[i].HLRR_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Nickel')sbp_single_past[i].NICKEL_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Aluminium')sbp_single_past[i].ALUMINUM_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Molybdenum')sbp_single_past[i].MOLYBDENUM_String__c=monthvalue;                    
                    if(sbpts.varPrice_RC=='Other metals')sbp_single_past[i].OTHER_METALS_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Eng. Changes')sbp_single_past[i].ENG_CHANGES_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='FX')sbp_single_past[i].FX_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='End of Tooling amortization')sbp_single_past[i].ENDTOOLAMOR_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='End of RD&E amortization')sbp_single_past[i].ENDRD_EAMOR_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Interest on RD&E & tooling amort.')sbp_single_past[i].INTERESTRDE_TOOLAMO_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Logistic/Packaging')sbp_single_past[i].LOGISTIC_PACKAGING_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Other')sbp_single_past[i].OTHER_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Effective Date')sbp_single_past[i].First_Day__c=Decimal.valueOf(monthvalue);
                
                }
                
                for (Integer i = 0; i < sbp_single_forecast.size(); i++) {
                        
                    String monthvalue='';
                    
                    if (sbp_single_forecast.size()==24){                    
                        if(i==0)monthvalue=sbpts.varM1Y1;
                        if(i==1)monthvalue=sbpts.varM2Y1;
                        if(i==2)monthvalue=sbpts.varM3Y1;
                        if(i==3)monthvalue=sbpts.varM4Y1;
                        if(i==4)monthvalue=sbpts.varM5Y1;
                        if(i==5)monthvalue=sbpts.varM6Y1;
                        if(i==6)monthvalue=sbpts.varM7Y1;
                        if(i==7)monthvalue=sbpts.varM8Y1;
                        if(i==8)monthvalue=sbpts.varM9Y1;
                        if(i==9)monthvalue=sbpts.varM10Y1;
                        if(i==10)monthvalue=sbpts.varM11Y1;
                        if(i==11)monthvalue=sbpts.varM12Y1;
                        if(i==12)monthvalue=sbpts.varM1Y2;
                        if(i==13)monthvalue=sbpts.varM2Y2;
                        if(i==14)monthvalue=sbpts.varM3Y2;
                        if(i==15)monthvalue=sbpts.varM4Y2;
                        if(i==16)monthvalue=sbpts.varM5Y2;
                        if(i==17)monthvalue=sbpts.varM6Y2;
                        if(i==18)monthvalue=sbpts.varM7Y2;
                        if(i==19)monthvalue=sbpts.varM8Y2;
                        if(i==20)monthvalue=sbpts.varM9Y2;
                        if(i==21)monthvalue=sbpts.varM10Y2;
                        if(i==22)monthvalue=sbpts.varM11Y2;
                        if(i==23)monthvalue=sbpts.varM12Y2;}
                    
                    if (sbp_single_forecast.size()==23){                    
                        if(i==0)monthvalue=sbpts.varM2Y1;
                        if(i==1)monthvalue=sbpts.varM3Y1;
                        if(i==2)monthvalue=sbpts.varM4Y1;
                        if(i==3)monthvalue=sbpts.varM5Y1;
                        if(i==4)monthvalue=sbpts.varM6Y1;
                        if(i==5)monthvalue=sbpts.varM7Y1;
                        if(i==6)monthvalue=sbpts.varM8Y1;
                        if(i==7)monthvalue=sbpts.varM9Y1;
                        if(i==8)monthvalue=sbpts.varM10Y1;
                        if(i==9)monthvalue=sbpts.varM11Y1;
                        if(i==10)monthvalue=sbpts.varM12Y1;
                        if(i==11)monthvalue=sbpts.varM1Y2;
                        if(i==12)monthvalue=sbpts.varM2Y2;
                        if(i==13)monthvalue=sbpts.varM3Y2;
                        if(i==14)monthvalue=sbpts.varM4Y2;
                        if(i==15)monthvalue=sbpts.varM5Y2;
                        if(i==16)monthvalue=sbpts.varM6Y2;
                        if(i==17)monthvalue=sbpts.varM7Y2;
                        if(i==18)monthvalue=sbpts.varM8Y2;
                        if(i==19)monthvalue=sbpts.varM9Y2;
                        if(i==20)monthvalue=sbpts.varM10Y2;
                        if(i==21)monthvalue=sbpts.varM11Y2;
                        if(i==22)monthvalue=sbpts.varM12Y2;}
                    
                    if (sbp_single_forecast.size()==22){                    
                        if(i==0)monthvalue=sbpts.varM3Y1;
                        if(i==1)monthvalue=sbpts.varM4Y1;
                        if(i==2)monthvalue=sbpts.varM5Y1;
                        if(i==3)monthvalue=sbpts.varM6Y1;
                        if(i==4)monthvalue=sbpts.varM7Y1;
                        if(i==5)monthvalue=sbpts.varM8Y1;
                        if(i==6)monthvalue=sbpts.varM9Y1;
                        if(i==7)monthvalue=sbpts.varM10Y1;
                        if(i==8)monthvalue=sbpts.varM11Y1;
                        if(i==9)monthvalue=sbpts.varM12Y1;
                        if(i==10)monthvalue=sbpts.varM1Y2;
                        if(i==11)monthvalue=sbpts.varM2Y2;
                        if(i==12)monthvalue=sbpts.varM3Y2;
                        if(i==13)monthvalue=sbpts.varM4Y2;
                        if(i==14)monthvalue=sbpts.varM5Y2;
                        if(i==15)monthvalue=sbpts.varM6Y2;
                        if(i==16)monthvalue=sbpts.varM7Y2;
                        if(i==17)monthvalue=sbpts.varM8Y2;
                        if(i==18)monthvalue=sbpts.varM9Y2;
                        if(i==19)monthvalue=sbpts.varM10Y2;
                        if(i==20)monthvalue=sbpts.varM11Y2;
                        if(i==21)monthvalue=sbpts.varM12Y2;}
                    
                    if (sbp_single_forecast.size()==21){                    
                        if(i==0)monthvalue=sbpts.varM4Y1;
                        if(i==1)monthvalue=sbpts.varM5Y1;
                        if(i==2)monthvalue=sbpts.varM6Y1;
                        if(i==3)monthvalue=sbpts.varM7Y1;
                        if(i==4)monthvalue=sbpts.varM8Y1;
                        if(i==5)monthvalue=sbpts.varM9Y1;
                        if(i==6)monthvalue=sbpts.varM10Y1;
                        if(i==7)monthvalue=sbpts.varM11Y1;
                        if(i==8)monthvalue=sbpts.varM12Y1;
                        if(i==9)monthvalue=sbpts.varM1Y2;
                        if(i==10)monthvalue=sbpts.varM2Y2;
                        if(i==11)monthvalue=sbpts.varM3Y2;
                        if(i==12)monthvalue=sbpts.varM4Y2;
                        if(i==13)monthvalue=sbpts.varM5Y2;
                        if(i==14)monthvalue=sbpts.varM6Y2;
                        if(i==15)monthvalue=sbpts.varM7Y2;
                        if(i==16)monthvalue=sbpts.varM8Y2;
                        if(i==17)monthvalue=sbpts.varM9Y2;
                        if(i==18)monthvalue=sbpts.varM10Y2;
                        if(i==19)monthvalue=sbpts.varM11Y2;
                        if(i==20)monthvalue=sbpts.varM12Y2;}
                        
                    if (sbp_single_forecast.size()==20){                    
                        if(i==0)monthvalue=sbpts.varM5Y1;
                        if(i==1)monthvalue=sbpts.varM6Y1;
                        if(i==2)monthvalue=sbpts.varM7Y1;
                        if(i==3)monthvalue=sbpts.varM8Y1;
                        if(i==4)monthvalue=sbpts.varM9Y1;
                        if(i==5)monthvalue=sbpts.varM10Y1;
                        if(i==6)monthvalue=sbpts.varM11Y1;
                        if(i==7)monthvalue=sbpts.varM12Y1;
                        if(i==8)monthvalue=sbpts.varM1Y2;
                        if(i==9)monthvalue=sbpts.varM2Y2;
                        if(i==10)monthvalue=sbpts.varM3Y2;
                        if(i==11)monthvalue=sbpts.varM4Y2;
                        if(i==12)monthvalue=sbpts.varM5Y2;
                        if(i==13)monthvalue=sbpts.varM6Y2;
                        if(i==14)monthvalue=sbpts.varM7Y2;
                        if(i==15)monthvalue=sbpts.varM8Y2;
                        if(i==16)monthvalue=sbpts.varM9Y2;
                        if(i==17)monthvalue=sbpts.varM10Y2;
                        if(i==18)monthvalue=sbpts.varM11Y2;
                        if(i==19)monthvalue=sbpts.varM12Y2;}
                        
                    if (sbp_single_forecast.size()==19){                    
                        if(i==0)monthvalue=sbpts.varM6Y1;
                        if(i==1)monthvalue=sbpts.varM7Y1;
                        if(i==2)monthvalue=sbpts.varM8Y1;
                        if(i==3)monthvalue=sbpts.varM9Y1;
                        if(i==4)monthvalue=sbpts.varM10Y1;
                        if(i==5)monthvalue=sbpts.varM11Y1;
                        if(i==6)monthvalue=sbpts.varM12Y1;
                        if(i==7)monthvalue=sbpts.varM1Y2;
                        if(i==8)monthvalue=sbpts.varM2Y2;
                        if(i==9)monthvalue=sbpts.varM3Y2;
                        if(i==10)monthvalue=sbpts.varM4Y2;
                        if(i==11)monthvalue=sbpts.varM5Y2;
                        if(i==12)monthvalue=sbpts.varM6Y2;
                        if(i==13)monthvalue=sbpts.varM7Y2;
                        if(i==14)monthvalue=sbpts.varM8Y2;
                        if(i==15)monthvalue=sbpts.varM9Y2;
                        if(i==16)monthvalue=sbpts.varM10Y2;
                        if(i==17)monthvalue=sbpts.varM11Y2;
                        if(i==18)monthvalue=sbpts.varM12Y2;}
                      
                    if (sbp_single_forecast.size()==18){                    
                        if(i==0)monthvalue=sbpts.varM7Y1;
                        if(i==1)monthvalue=sbpts.varM8Y1;
                        if(i==2)monthvalue=sbpts.varM9Y1;
                        if(i==3)monthvalue=sbpts.varM10Y1;
                        if(i==4)monthvalue=sbpts.varM11Y1;
                        if(i==5)monthvalue=sbpts.varM12Y1;
                        if(i==6)monthvalue=sbpts.varM1Y2;
                        if(i==7)monthvalue=sbpts.varM2Y2;
                        if(i==8)monthvalue=sbpts.varM3Y2;
                        if(i==9)monthvalue=sbpts.varM4Y2;
                        if(i==10)monthvalue=sbpts.varM5Y2;
                        if(i==11)monthvalue=sbpts.varM6Y2;
                        if(i==12)monthvalue=sbpts.varM7Y2;
                        if(i==13)monthvalue=sbpts.varM8Y2;
                        if(i==14)monthvalue=sbpts.varM9Y2;
                        if(i==15)monthvalue=sbpts.varM10Y2;
                        if(i==16)monthvalue=sbpts.varM11Y2;
                        if(i==17)monthvalue=sbpts.varM12Y2;}
                        
                    if (sbp_single_forecast.size()==17){                    
                        if(i==0)monthvalue=sbpts.varM8Y1;
                        if(i==1)monthvalue=sbpts.varM9Y1;
                        if(i==2)monthvalue=sbpts.varM10Y1;
                        if(i==3)monthvalue=sbpts.varM11Y1;
                        if(i==4)monthvalue=sbpts.varM12Y1;
                        if(i==5)monthvalue=sbpts.varM1Y2;
                        if(i==6)monthvalue=sbpts.varM2Y2;
                        if(i==7)monthvalue=sbpts.varM3Y2;
                        if(i==8)monthvalue=sbpts.varM4Y2;
                        if(i==9)monthvalue=sbpts.varM5Y2;
                        if(i==10)monthvalue=sbpts.varM6Y2;
                        if(i==11)monthvalue=sbpts.varM7Y2;
                        if(i==12)monthvalue=sbpts.varM8Y2;
                        if(i==13)monthvalue=sbpts.varM9Y2;
                        if(i==14)monthvalue=sbpts.varM10Y2;
                        if(i==15)monthvalue=sbpts.varM11Y2;
                        if(i==16)monthvalue=sbpts.varM12Y2;}
                      
                    if (sbp_single_forecast.size()==16){                    
                        if(i==0)monthvalue=sbpts.varM9Y1;
                        if(i==1)monthvalue=sbpts.varM10Y1;
                        if(i==2)monthvalue=sbpts.varM11Y1;
                        if(i==3)monthvalue=sbpts.varM12Y1;
                        if(i==4)monthvalue=sbpts.varM1Y2;
                        if(i==5)monthvalue=sbpts.varM2Y2;
                        if(i==6)monthvalue=sbpts.varM3Y2;
                        if(i==7)monthvalue=sbpts.varM4Y2;
                        if(i==8)monthvalue=sbpts.varM5Y2;
                        if(i==9)monthvalue=sbpts.varM6Y2;
                        if(i==10)monthvalue=sbpts.varM7Y2;
                        if(i==11)monthvalue=sbpts.varM8Y2;
                        if(i==12)monthvalue=sbpts.varM9Y2;
                        if(i==13)monthvalue=sbpts.varM10Y2;
                        if(i==14)monthvalue=sbpts.varM11Y2;
                        if(i==15)monthvalue=sbpts.varM12Y2;}
                        
                    if (sbp_single_forecast.size()==15){                    
                        if(i==0)monthvalue=sbpts.varM10Y1;
                        if(i==1)monthvalue=sbpts.varM11Y1;
                        if(i==2)monthvalue=sbpts.varM12Y1;
                        if(i==3)monthvalue=sbpts.varM1Y2;
                        if(i==4)monthvalue=sbpts.varM2Y2;
                        if(i==5)monthvalue=sbpts.varM3Y2;
                        if(i==6)monthvalue=sbpts.varM4Y2;
                        if(i==7)monthvalue=sbpts.varM5Y2;
                        if(i==8)monthvalue=sbpts.varM6Y2;
                        if(i==9)monthvalue=sbpts.varM7Y2;
                        if(i==10)monthvalue=sbpts.varM8Y2;
                        if(i==11)monthvalue=sbpts.varM9Y2;
                        if(i==12)monthvalue=sbpts.varM10Y2;
                        if(i==13)monthvalue=sbpts.varM11Y2;
                        if(i==14)monthvalue=sbpts.varM12Y2;}
                        
                    if (sbp_single_forecast.size()==14){                    
                        if(i==0)monthvalue=sbpts.varM11Y1;
                        if(i==1)monthvalue=sbpts.varM12Y1;
                        if(i==2)monthvalue=sbpts.varM1Y2;
                        if(i==3)monthvalue=sbpts.varM2Y2;
                        if(i==4)monthvalue=sbpts.varM3Y2;
                        if(i==5)monthvalue=sbpts.varM4Y2;
                        if(i==6)monthvalue=sbpts.varM5Y2;
                        if(i==7)monthvalue=sbpts.varM6Y2;
                        if(i==8)monthvalue=sbpts.varM7Y2;
                        if(i==9)monthvalue=sbpts.varM8Y2;
                        if(i==10)monthvalue=sbpts.varM9Y2;
                        if(i==11)monthvalue=sbpts.varM10Y2;
                        if(i==12)monthvalue=sbpts.varM11Y2;
                        if(i==13)monthvalue=sbpts.varM12Y2;}
                        
                    if (sbp_single_forecast.size()==13){                    
                        if(i==0)monthvalue=sbpts.varM12Y1;
                        if(i==1)monthvalue=sbpts.varM1Y2;
                        if(i==2)monthvalue=sbpts.varM2Y2;
                        if(i==3)monthvalue=sbpts.varM3Y2;
                        if(i==4)monthvalue=sbpts.varM4Y2;
                        if(i==5)monthvalue=sbpts.varM5Y2;
                        if(i==6)monthvalue=sbpts.varM6Y2;
                        if(i==7)monthvalue=sbpts.varM7Y2;
                        if(i==8)monthvalue=sbpts.varM8Y2;
                        if(i==9)monthvalue=sbpts.varM9Y2;
                        if(i==10)monthvalue=sbpts.varM10Y2;
                        if(i==11)monthvalue=sbpts.varM11Y2;
                        if(i==12)monthvalue=sbpts.varM12Y2;}
                        
                    if(sbpts.varPrice_RC=='Pure Price Contractual')sbp_single_forecast[i].PURE_PRICE_CONTRACTUAL_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Pure Price Biz Win')sbp_single_forecast[i].PURE_PRICE_BIZ_WINS_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='VE/HLRR PT')sbp_single_forecast[i].HLRR_String__c=monthvalue;                    
                    if(sbpts.varPrice_RC=='Nickel')sbp_single_forecast[i].NICKEL_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Aluminium')sbp_single_forecast[i].ALUMINUM_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Molybdenum')sbp_single_forecast[i].MOLYBDENUM_String__c=monthvalue;                    
                    if(sbpts.varPrice_RC=='Other metals')sbp_single_forecast[i].OTHER_METALS_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Eng. Changes')sbp_single_forecast[i].ENG_CHANGES_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='FX')sbp_single_forecast[i].FX_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='End of Tooling amortization')sbp_single_forecast[i].ENDTOOLAMOR_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='End of RD&E amortization')sbp_single_forecast[i].ENDRD_EAMOR_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Interest on RD&E & tooling amort.')sbp_single_forecast[i].INTERESTRDE_TOOLAMO_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Logistic/Packaging')sbp_single_forecast[i].LOGISTIC_PACKAGING_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Other')sbp_single_forecast[i].OTHER_String__c=monthvalue;
                    if(sbpts.varPrice_RC=='Effective Date')sbp_single_forecast[i].First_Day__c=Decimal.valueOf(monthvalue);
                
                }
                
            }            

        }
        
    }
    
    public void TransposeFromWrapperAll(){
    
    system.debug('TransposeFromWrapperAll ' );
    
        if(!sbp_tran_all.isEmpty()){
        
            system.debug ('TransposeFromWrapperAll - sbp_tran_all' + sbp_tran_all);
            system.debug ('TransposeFromWrapperAll - sbp_all_past.size() ' + sbp_all_past.size());
            system.debug ('TransposeFromWrapperAll - sbp_all_forecast.size() ' + sbp_all_forecast.size());
            
            for(SBPListWrapper sbpta: sbp_tran_all){
            
                for (Integer i = 0; i < sbp_all_past.size(); i++) {
                        
                    String monthvalue='';
                        
                    if(i==0)monthvalue=sbpta.varM1Y0;
                    if(i==1)monthvalue=sbpta.varM2Y0;
                    if(i==2)monthvalue=sbpta.varM3Y0;
                    if(i==3)monthvalue=sbpta.varM4Y0;
                    if(i==4)monthvalue=sbpta.varM5Y0;
                    if(i==5)monthvalue=sbpta.varM6Y0;
                    if(i==6)monthvalue=sbpta.varM7Y0;
                    if(i==7)monthvalue=sbpta.varM8Y0;
                    if(i==8)monthvalue=sbpta.varM9Y0;
                    if(i==9)monthvalue=sbpta.varM10Y0;
                    if(i==10)monthvalue=sbpta.varM11Y0;
                    if(i==11)monthvalue=sbpta.varM12Y0;
                    if(i==12)monthvalue=sbpta.varM1Y1;
                    if(i==13)monthvalue=sbpta.varM2Y1;
                    if(i==14)monthvalue=sbpta.varM3Y1;
                    if(i==15)monthvalue=sbpta.varM4Y1;
                    if(i==16)monthvalue=sbpta.varM5Y1;
                    if(i==17)monthvalue=sbpta.varM6Y1;
                    if(i==18)monthvalue=sbpta.varM7Y1;
                    if(i==19)monthvalue=sbpta.varM8Y1;
                    if(i==20)monthvalue=sbpta.varM9Y1;
                    if(i==21)monthvalue=sbpta.varM10Y1;
                    if(i==22)monthvalue=sbpta.varM11Y1;
                    if(i==23)monthvalue=sbpta.varM12Y1;
                    
                    
                        
                    if(sbpta.varPrice_RC=='Effective Date')sbp_all_past[i].First_Day__c=Decimal.valueOf(monthvalue);
                    if(sbpta.varPrice_RC=='Pure Price Contractual')sbp_all_past[i].PURE_PRICE_CONTRACTUAL_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Pure Price Biz Win')sbp_all_past[i].PURE_PRICE_BIZ_WINS_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='VE/HLRR PT')sbp_all_past[i].HLRR_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Nickel')sbp_all_past[i].NICKEL_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Aluminium')sbp_all_past[i].ALUMINUM_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Molybdenum')sbp_all_past[i].MOLYBDENUM_String__c=monthvalue;                    
                    if(sbpta.varPrice_RC=='Other metals')sbp_all_past[i].OTHER_METALS_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Eng. Changes')sbp_all_past[i].ENG_CHANGES_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='FX')sbp_all_past[i].FX_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='End of Tooling amortization')sbp_all_past[i].ENDTOOLAMOR_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='End of RD&E amortization')sbp_all_past[i].ENDRD_EAMOR_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Interest on RD&E & tooling amort.')sbp_all_past[i].INTERESTRDE_TOOLAMO_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Logistic/Packaging')sbp_all_past[i].LOGISTIC_PACKAGING_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Other')sbp_all_past[i].OTHER_String__c=monthvalue;
                
                }
                
                for (Integer i = 0; i < sbp_all_forecast.size(); i++) {
                        
                    String monthvalue='';
                    
                    if (sbp_all_forecast.size()==24){                    
                        if(i==0)monthvalue=sbpta.varM1Y1;
                        if(i==1)monthvalue=sbpta.varM2Y1;
                        if(i==2)monthvalue=sbpta.varM3Y1;
                        if(i==3)monthvalue=sbpta.varM4Y1;
                        if(i==4)monthvalue=sbpta.varM5Y1;
                        if(i==5)monthvalue=sbpta.varM6Y1;
                        if(i==6)monthvalue=sbpta.varM7Y1;
                        if(i==7)monthvalue=sbpta.varM8Y1;
                        if(i==8)monthvalue=sbpta.varM9Y1;
                        if(i==9)monthvalue=sbpta.varM10Y1;
                        if(i==10)monthvalue=sbpta.varM11Y1;
                        if(i==11)monthvalue=sbpta.varM12Y1;
                        if(i==12)monthvalue=sbpta.varM1Y2;
                        if(i==13)monthvalue=sbpta.varM2Y2;
                        if(i==14)monthvalue=sbpta.varM3Y2;
                        if(i==15)monthvalue=sbpta.varM4Y2;
                        if(i==16)monthvalue=sbpta.varM5Y2;
                        if(i==17)monthvalue=sbpta.varM6Y2;
                        if(i==18)monthvalue=sbpta.varM7Y2;
                        if(i==19)monthvalue=sbpta.varM8Y2;
                        if(i==20)monthvalue=sbpta.varM9Y2;
                        if(i==21)monthvalue=sbpta.varM10Y2;
                        if(i==22)monthvalue=sbpta.varM11Y2;
                        if(i==23)monthvalue=sbpta.varM12Y2;}
                    
                    if (sbp_all_forecast.size()==23){                    
                        if(i==0)monthvalue=sbpta.varM2Y1;
                        if(i==1)monthvalue=sbpta.varM3Y1;
                        if(i==2)monthvalue=sbpta.varM4Y1;
                        if(i==3)monthvalue=sbpta.varM5Y1;
                        if(i==4)monthvalue=sbpta.varM6Y1;
                        if(i==5)monthvalue=sbpta.varM7Y1;
                        if(i==6)monthvalue=sbpta.varM8Y1;
                        if(i==7)monthvalue=sbpta.varM9Y1;
                        if(i==8)monthvalue=sbpta.varM10Y1;
                        if(i==9)monthvalue=sbpta.varM11Y1;
                        if(i==10)monthvalue=sbpta.varM12Y1;
                        if(i==11)monthvalue=sbpta.varM1Y2;
                        if(i==12)monthvalue=sbpta.varM2Y2;
                        if(i==13)monthvalue=sbpta.varM3Y2;
                        if(i==14)monthvalue=sbpta.varM4Y2;
                        if(i==15)monthvalue=sbpta.varM5Y2;
                        if(i==16)monthvalue=sbpta.varM6Y2;
                        if(i==17)monthvalue=sbpta.varM7Y2;
                        if(i==18)monthvalue=sbpta.varM8Y2;
                        if(i==19)monthvalue=sbpta.varM9Y2;
                        if(i==20)monthvalue=sbpta.varM10Y2;
                        if(i==21)monthvalue=sbpta.varM11Y2;
                        if(i==22)monthvalue=sbpta.varM12Y2;}
                    
                    if (sbp_all_forecast.size()==22){                    
                        if(i==0)monthvalue=sbpta.varM3Y1;
                        if(i==1)monthvalue=sbpta.varM4Y1;
                        if(i==2)monthvalue=sbpta.varM5Y1;
                        if(i==3)monthvalue=sbpta.varM6Y1;
                        if(i==4)monthvalue=sbpta.varM7Y1;
                        if(i==5)monthvalue=sbpta.varM8Y1;
                        if(i==6)monthvalue=sbpta.varM9Y1;
                        if(i==7)monthvalue=sbpta.varM10Y1;
                        if(i==8)monthvalue=sbpta.varM11Y1;
                        if(i==9)monthvalue=sbpta.varM12Y1;
                        if(i==10)monthvalue=sbpta.varM1Y2;
                        if(i==11)monthvalue=sbpta.varM2Y2;
                        if(i==12)monthvalue=sbpta.varM3Y2;
                        if(i==13)monthvalue=sbpta.varM4Y2;
                        if(i==14)monthvalue=sbpta.varM5Y2;
                        if(i==15)monthvalue=sbpta.varM6Y2;
                        if(i==16)monthvalue=sbpta.varM7Y2;
                        if(i==17)monthvalue=sbpta.varM8Y2;
                        if(i==18)monthvalue=sbpta.varM9Y2;
                        if(i==19)monthvalue=sbpta.varM10Y2;
                        if(i==20)monthvalue=sbpta.varM11Y2;
                        if(i==21)monthvalue=sbpta.varM12Y2;}
                    
                    if (sbp_all_forecast.size()==21){                    
                        if(i==0)monthvalue=sbpta.varM4Y1;
                        if(i==1)monthvalue=sbpta.varM5Y1;
                        if(i==2)monthvalue=sbpta.varM6Y1;
                        if(i==3)monthvalue=sbpta.varM7Y1;
                        if(i==4)monthvalue=sbpta.varM8Y1;
                        if(i==5)monthvalue=sbpta.varM9Y1;
                        if(i==6)monthvalue=sbpta.varM10Y1;
                        if(i==7)monthvalue=sbpta.varM11Y1;
                        if(i==8)monthvalue=sbpta.varM12Y1;
                        if(i==9)monthvalue=sbpta.varM1Y2;
                        if(i==10)monthvalue=sbpta.varM2Y2;
                        if(i==11)monthvalue=sbpta.varM3Y2;
                        if(i==12)monthvalue=sbpta.varM4Y2;
                        if(i==13)monthvalue=sbpta.varM5Y2;
                        if(i==14)monthvalue=sbpta.varM6Y2;
                        if(i==15)monthvalue=sbpta.varM7Y2;
                        if(i==16)monthvalue=sbpta.varM8Y2;
                        if(i==17)monthvalue=sbpta.varM9Y2;
                        if(i==18)monthvalue=sbpta.varM10Y2;
                        if(i==19)monthvalue=sbpta.varM11Y2;
                        if(i==20)monthvalue=sbpta.varM12Y2;}
                        
                    if (sbp_all_forecast.size()==20){                    
                        if(i==0)monthvalue=sbpta.varM5Y1;
                        if(i==1)monthvalue=sbpta.varM6Y1;
                        if(i==2)monthvalue=sbpta.varM7Y1;
                        if(i==3)monthvalue=sbpta.varM8Y1;
                        if(i==4)monthvalue=sbpta.varM9Y1;
                        if(i==5)monthvalue=sbpta.varM10Y1;
                        if(i==6)monthvalue=sbpta.varM11Y1;
                        if(i==7)monthvalue=sbpta.varM12Y1;
                        if(i==8)monthvalue=sbpta.varM1Y2;
                        if(i==9)monthvalue=sbpta.varM2Y2;
                        if(i==10)monthvalue=sbpta.varM3Y2;
                        if(i==11)monthvalue=sbpta.varM4Y2;
                        if(i==12)monthvalue=sbpta.varM5Y2;
                        if(i==13)monthvalue=sbpta.varM6Y2;
                        if(i==14)monthvalue=sbpta.varM7Y2;
                        if(i==15)monthvalue=sbpta.varM8Y2;
                        if(i==16)monthvalue=sbpta.varM9Y2;
                        if(i==17)monthvalue=sbpta.varM10Y2;
                        if(i==18)monthvalue=sbpta.varM11Y2;
                        if(i==19)monthvalue=sbpta.varM12Y2;}
                        
                    if (sbp_all_forecast.size()==19){                    
                        if(i==0)monthvalue=sbpta.varM6Y1;
                        if(i==1)monthvalue=sbpta.varM7Y1;
                        if(i==2)monthvalue=sbpta.varM8Y1;
                        if(i==3)monthvalue=sbpta.varM9Y1;
                        if(i==4)monthvalue=sbpta.varM10Y1;
                        if(i==5)monthvalue=sbpta.varM11Y1;
                        if(i==6)monthvalue=sbpta.varM12Y1;
                        if(i==7)monthvalue=sbpta.varM1Y2;
                        if(i==8)monthvalue=sbpta.varM2Y2;
                        if(i==9)monthvalue=sbpta.varM3Y2;
                        if(i==10)monthvalue=sbpta.varM4Y2;
                        if(i==11)monthvalue=sbpta.varM5Y2;
                        if(i==12)monthvalue=sbpta.varM6Y2;
                        if(i==13)monthvalue=sbpta.varM7Y2;
                        if(i==14)monthvalue=sbpta.varM8Y2;
                        if(i==15)monthvalue=sbpta.varM9Y2;
                        if(i==16)monthvalue=sbpta.varM10Y2;
                        if(i==17)monthvalue=sbpta.varM11Y2;
                        if(i==18)monthvalue=sbpta.varM12Y2;}
                      
                    if (sbp_all_forecast.size()==18){                    
                        if(i==0)monthvalue=sbpta.varM7Y1;
                        if(i==1)monthvalue=sbpta.varM8Y1;
                        if(i==2)monthvalue=sbpta.varM9Y1;
                        if(i==3)monthvalue=sbpta.varM10Y1;
                        if(i==4)monthvalue=sbpta.varM11Y1;
                        if(i==5)monthvalue=sbpta.varM12Y1;
                        if(i==6)monthvalue=sbpta.varM1Y2;
                        if(i==7)monthvalue=sbpta.varM2Y2;
                        if(i==8)monthvalue=sbpta.varM3Y2;
                        if(i==9)monthvalue=sbpta.varM4Y2;
                        if(i==10)monthvalue=sbpta.varM5Y2;
                        if(i==11)monthvalue=sbpta.varM6Y2;
                        if(i==12)monthvalue=sbpta.varM7Y2;
                        if(i==13)monthvalue=sbpta.varM8Y2;
                        if(i==14)monthvalue=sbpta.varM9Y2;
                        if(i==15)monthvalue=sbpta.varM10Y2;
                        if(i==16)monthvalue=sbpta.varM11Y2;
                        if(i==17)monthvalue=sbpta.varM12Y2;}
                        
                    if (sbp_all_forecast.size()==17){                    
                        if(i==0)monthvalue=sbpta.varM8Y1;
                        if(i==1)monthvalue=sbpta.varM9Y1;
                        if(i==2)monthvalue=sbpta.varM10Y1;
                        if(i==3)monthvalue=sbpta.varM11Y1;
                        if(i==4)monthvalue=sbpta.varM12Y1;
                        if(i==5)monthvalue=sbpta.varM1Y2;
                        if(i==6)monthvalue=sbpta.varM2Y2;
                        if(i==7)monthvalue=sbpta.varM3Y2;
                        if(i==8)monthvalue=sbpta.varM4Y2;
                        if(i==9)monthvalue=sbpta.varM5Y2;
                        if(i==10)monthvalue=sbpta.varM6Y2;
                        if(i==11)monthvalue=sbpta.varM7Y2;
                        if(i==12)monthvalue=sbpta.varM8Y2;
                        if(i==13)monthvalue=sbpta.varM9Y2;
                        if(i==14)monthvalue=sbpta.varM10Y2;
                        if(i==15)monthvalue=sbpta.varM11Y2;
                        if(i==16)monthvalue=sbpta.varM12Y2;}
                      
                    if (sbp_all_forecast.size()==16){                    
                        if(i==0)monthvalue=sbpta.varM9Y1;
                        if(i==1)monthvalue=sbpta.varM10Y1;
                        if(i==2)monthvalue=sbpta.varM11Y1;
                        if(i==3)monthvalue=sbpta.varM12Y1;
                        if(i==4)monthvalue=sbpta.varM1Y2;
                        if(i==5)monthvalue=sbpta.varM2Y2;
                        if(i==6)monthvalue=sbpta.varM3Y2;
                        if(i==7)monthvalue=sbpta.varM4Y2;
                        if(i==8)monthvalue=sbpta.varM5Y2;
                        if(i==9)monthvalue=sbpta.varM6Y2;
                        if(i==10)monthvalue=sbpta.varM7Y2;
                        if(i==11)monthvalue=sbpta.varM8Y2;
                        if(i==12)monthvalue=sbpta.varM9Y2;
                        if(i==13)monthvalue=sbpta.varM10Y2;
                        if(i==14)monthvalue=sbpta.varM11Y2;
                        if(i==15)monthvalue=sbpta.varM12Y2;}
                        
                    if (sbp_all_forecast.size()==15){                    
                        if(i==0)monthvalue=sbpta.varM10Y1;
                        if(i==1)monthvalue=sbpta.varM11Y1;
                        if(i==2)monthvalue=sbpta.varM12Y1;
                        if(i==3)monthvalue=sbpta.varM1Y2;
                        if(i==4)monthvalue=sbpta.varM2Y2;
                        if(i==5)monthvalue=sbpta.varM3Y2;
                        if(i==6)monthvalue=sbpta.varM4Y2;
                        if(i==7)monthvalue=sbpta.varM5Y2;
                        if(i==8)monthvalue=sbpta.varM6Y2;
                        if(i==9)monthvalue=sbpta.varM7Y2;
                        if(i==10)monthvalue=sbpta.varM8Y2;
                        if(i==11)monthvalue=sbpta.varM9Y2;
                        if(i==12)monthvalue=sbpta.varM10Y2;
                        if(i==13)monthvalue=sbpta.varM11Y2;
                        if(i==14)monthvalue=sbpta.varM12Y2;}
                        
                    if (sbp_all_forecast.size()==14){                    
                        if(i==0)monthvalue=sbpta.varM11Y1;
                        if(i==1)monthvalue=sbpta.varM12Y1;
                        if(i==2)monthvalue=sbpta.varM1Y2;
                        if(i==3)monthvalue=sbpta.varM2Y2;
                        if(i==4)monthvalue=sbpta.varM3Y2;
                        if(i==5)monthvalue=sbpta.varM4Y2;
                        if(i==6)monthvalue=sbpta.varM5Y2;
                        if(i==7)monthvalue=sbpta.varM6Y2;
                        if(i==8)monthvalue=sbpta.varM7Y2;
                        if(i==9)monthvalue=sbpta.varM8Y2;
                        if(i==10)monthvalue=sbpta.varM9Y2;
                        if(i==11)monthvalue=sbpta.varM10Y2;
                        if(i==12)monthvalue=sbpta.varM11Y2;
                        if(i==13)monthvalue=sbpta.varM12Y2;}
                        
                    if (sbp_all_forecast.size()==13){                    
                        if(i==0)monthvalue=sbpta.varM12Y1;
                        if(i==1)monthvalue=sbpta.varM1Y2;
                        if(i==2)monthvalue=sbpta.varM2Y2;
                        if(i==3)monthvalue=sbpta.varM3Y2;
                        if(i==4)monthvalue=sbpta.varM4Y2;
                        if(i==5)monthvalue=sbpta.varM5Y2;
                        if(i==6)monthvalue=sbpta.varM6Y2;
                        if(i==7)monthvalue=sbpta.varM7Y2;
                        if(i==8)monthvalue=sbpta.varM8Y2;
                        if(i==9)monthvalue=sbpta.varM9Y2;
                        if(i==10)monthvalue=sbpta.varM10Y2;
                        if(i==11)monthvalue=sbpta.varM11Y2;
                        if(i==12)monthvalue=sbpta.varM12Y2;}
                        
                    if(sbpta.varPrice_RC=='Effective Date')sbp_all_forecast[i].First_Day__c=Decimal.valueOf(monthvalue);
                    if(sbpta.varPrice_RC=='Pure Price Contractual')sbp_all_forecast[i].PURE_PRICE_CONTRACTUAL_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Pure Price Biz Win')sbp_all_forecast[i].PURE_PRICE_BIZ_WINS_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='VE/HLRR PT')sbp_all_forecast[i].HLRR_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Nickel')sbp_all_forecast[i].NICKEL_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Aluminium')sbp_all_forecast[i].ALUMINUM_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Molybdenum')sbp_all_forecast[i].MOLYBDENUM_String__c=monthvalue;                    
                    if(sbpta.varPrice_RC=='Other metals')sbp_all_forecast[i].OTHER_METALS_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Eng. Changes')sbp_all_forecast[i].ENG_CHANGES_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='FX')sbp_all_forecast[i].FX_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='End of Tooling amortization')sbp_all_forecast[i].ENDTOOLAMOR_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='End of RD&E amortization')sbp_all_forecast[i].ENDRD_EAMOR_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Interest on RD&E & tooling amort.')sbp_all_forecast[i].INTERESTRDE_TOOLAMO_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Logistic/Packaging')sbp_all_forecast[i].LOGISTIC_PACKAGING_String__c=monthvalue;
                    if(sbpta.varPrice_RC=='Other')sbp_all_forecast[i].OTHER_String__c=monthvalue;
                
                }
                
            }    
            
            system.debug ('TransposeFromWrapperAll - sbp_all_past ' + sbp_all_past);
            system.debug ('TransposeFromWrapperAll - sbp_all_forecast ' + sbp_all_forecast);        

        }
    }
    
    
    public void updateCheckbox(){
        salesPlanIdsToExport = '';
        show_edit_single=false;
        system.debug('%%%%%%%%%%%%% DEBUG ID: ' + sp_id + ' ' + selected_bool);
    
       /* for(sales_plan_list sp_temp: sp_list_table){
        
            if(sp_temp.sp.Id != sp_id && sp_temp.select_bool == true){
                sp_temp.select_bool = false;
            } else if(sp_temp.sp.Id == sp_id){
                sp_temp.select_bool = true;
            }
        }*/
        
        //system.debug('%%%%%%%%%%%%% DEBUG ID2: ' + sp_id + ' ' + selected_bool);
        for(sales_plan_list sp_temp1 : sp_list_table){
            //system.debug('HTT_ShouldBePrice_editpage_Controller::updateCheckbox::sp_temp1.sp.Id='+sp_temp1.sp.Id);
            //system.debug('HTT_ShouldBePrice_editpage_Controller::updateCheckbox::sp_temp1.select_bool='+sp_temp1.select_bool);
            if(sp_temp1.select_bool){salesPlanIdsToExport+=''+sp_temp1.sp.Id+',';}
        }
        //system.debug('HTT_ShouldBePrice_editpage_Controller::updateCheckbox::salesPlanIdsToExport='+salesPlanIdsToExport);
    }
    
    //function to update all the sales plans
    public void updateAll(){
        
        system.debug('%%%%%%%%%%%%%%%%%%%% DEBUG updateAll ');
        
        {ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.INFO,message);
                            ApexPages.addMessage(myMsg);}
        
        try {
        
            message = '';
            //Create a set of all the sales plans ids
            sp_id_list = new List<Id>();
            Set<Id> spIds =  new Set<Id>();
            
            system.debug('%%%%%%%%%%%%%%%%%%%% DEBUG sp_list updateAll: ' + sp_list);
            
             //TransposefromWrapper to sbp_all_past and sbp_all_forecast
            TransposeFromWrapperAll();
            
            //rebuild sbp_all
            sbp_all.clear();
            sbp_all.addAll(sbp_all_past);
            sbp_all.addAll(sbp_all_forecast);       
            
            if(sp_list != null){
            
                if(!sp_list.isEmpty()){
                
                    if(sp_list.size() <= 90) {
                    
                        List<OEM_Sales_Plan_Ext_Data__c> salesPlansList = new List<OEM_Sales_Plan_Ext_Data__c>();
                        
                        for(OEM_Sales_Plan_Ext_Data__c sp_temp : sp_list){
                            sp_id_list.add(sp_temp.Id);
                            
                            OEM_Sales_Plan_Ext_Data__c salesPlan= new OEM_Sales_Plan_Ext_Data__c();
                            salesPlan.Id=sp_temp.Id;
                            salesPlan.Last_Child_Modified_Date__c = System.today();
                            salesPlansList.add(salesPlan);
                        }
                        
                        spIds.addAll(sp_id_list);
                        
                        system.debug('sp_id_list ' + sp_id_list);
                        
                        //query for every sbp
                        List<OEM_SBPP_Ext_Data__c> sbp_list = [SELECT Id, Sales_Plan__c, LC_Price__c, HLRR__c, NICKEL__c, ALUMINUM__c,MOLYBDENUM__c,
                                                               OTHER__c, OTH_METALS__c, ENG_CHANGES__c,PURE_PRICE_BIZ_WINS__c, PURE_PRICE_CONTRACTUAL__c,
                                                               FX__c,ENDTOOLAMOR__c,ENDRD_EAMOR__c,INTERESTRDE_TOOLAMO__c,LOGISTIC_PACKAGING__c, LC_Price_calcd__c, Month_Numeric__c, Year__c, CreatedDate 
                                                               FROM OEM_SBPP_Ext_Data__c WHERE Sales_Plan__c in :sp_id_list and isAOP__c=False 
                                                               ORDER BY Sales_Plan__c, Year__c,Month_Numeric__c ]; //CreatedDate
                        
                        system.debug('sbp_list ' + sbp_list);
                        
                        //message
                        //message = 'Updating ' + sbp_list.size() + ' records, please wait';              
                        
                        //update list
                        List<OEM_SBPP_Ext_Data__c> sbp_temp_list = new List<OEM_SBPP_Ext_Data__c>();
                        
                        for(Id temp_id : sp_id_list){
                            
                            //build temp list with the same ID, I count on the query order
                            
                            List<OEM_SBPP_Ext_Data__c> sbp_list2 = new List<OEM_SBPP_Ext_Data__c>();
                            
                            for(OEM_SBPP_Ext_Data__c sbp_temp : sbp_list){
                                if(sbp_temp.Sales_Plan__c == temp_id) sbp_list2.add(sbp_temp);
                            }
                            
                            system.debug('%%%%%%%%%%%%%% DEBUG SHOULD sbp_list2: ' + sbp_list2);
                            
                            //for(Integer temp_value = 0; temp_value <= 23; temp_value++){
                            for(Integer temp_value = 0; temp_value <= 35; temp_value++){
                                
                                if(temp_value != 0){
                                    sbp_all[temp_value].LC_Price__c = sbp_all[temp_value - 1].LC_Price__c + sbp_list2[temp_value - 1].HLRR__c + sbp_list2[temp_value - 1].NICKEL__c + sbp_list2[temp_value - 1].ALUMINUM__c + sbp_list2[temp_value - 1].MOLYBDENUM__c + sbp_list2[temp_value - 1].OTHER__c + sbp_list2[temp_value - 1].OTH_METALS__c + sbp_list2[temp_value - 1].ENG_CHANGES__c + sbp_list2[temp_value - 1].PURE_PRICE_BIZ_WINS__c + sbp_list2[temp_value - 1].PURE_PRICE_CONTRACTUAL__c + sbp_list2[temp_value - 1].FX__c + sbp_list2[temp_value - 1].ENDTOOLAMOR__c + sbp_list2[temp_value - 1].ENDRD_EAMOR__c + sbp_list2[temp_value - 1].INTERESTRDE_TOOLAMO__c + sbp_list2[temp_value - 1].LOGISTIC_PACKAGING__c;
                                } else sbp_all[temp_value].LC_Price__c = sbp_list2[temp_value].LC_Price__c;
                                
                                system.debug('%%%%%%%%%%%%%% DEBUG SHOULD sbp_list2: ' + sbp_list2[temp_value]);
                                system.debug('%%%%%%%%%%%%%% DEBUG SHOULD sbp_all[temp_value]: ' + sbp_all[temp_value]);
                                
                                if(sbp_all[temp_value].First_Day__c == 0) sbp_all[temp_value].First_Day__c = 1;
                                if(sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c == null || sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c == '') sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c = '0.00';
                                if(sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c == null || sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c == '') sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c = '0.00';
                                if(sbp_all[temp_value].HLRR_String__c == null || sbp_all[temp_value].HLRR_String__c == '') sbp_all[temp_value].HLRR_String__c = '0.00';
                                if(sbp_all[temp_value].NICKEL_String__c == null || sbp_all[temp_value].NICKEL_String__c == '') sbp_all[temp_value].NICKEL_String__c = '0.00';
                                if(sbp_all[temp_value].ALUMINUM_String__c == null || sbp_all[temp_value].ALUMINUM_String__c == '') sbp_all[temp_value].ALUMINUM_String__c = '0.00';
                                if(sbp_all[temp_value].MOLYBDENUM_String__c == null || sbp_all[temp_value].MOLYBDENUM_String__c == '') sbp_all[temp_value].MOLYBDENUM_String__c = '0.00';
                                if(sbp_all[temp_value].OTHER_METALS_String__c == null || sbp_all[temp_value].OTHER_METALS_String__c == '') sbp_all[temp_value].OTHER_METALS_String__c = '0.00';
                                if(sbp_all[temp_value].ENG_CHANGES_String__c == null || sbp_all[temp_value].ENG_CHANGES_String__c == '') sbp_all[temp_value].ENG_CHANGES_String__c = '0.00';
                                if(sbp_all[temp_value].OTHER_String__c == null || sbp_all[temp_value].OTHER_String__c == '') sbp_all[temp_value].OTHER_String__c = '0.00';
                                if(sbp_all[temp_value].FX_String__c == null || sbp_all[temp_value].FX_String__c == '') sbp_all[temp_value].FX_String__c = '0.00';
                                if(sbp_all[temp_value].ENDTOOLAMOR_String__c == null || sbp_all[temp_value].ENDTOOLAMOR_String__c == '') sbp_all[temp_value].ENDTOOLAMOR_String__c = '0.00';
                                if(sbp_all[temp_value].ENDRD_EAMOR_String__c == null || sbp_all[temp_value].ENDRD_EAMOR_String__c == '') sbp_all[temp_value].ENDRD_EAMOR_String__c = '0.00';
                                if(sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c == null || sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c == '') sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c = '0.00';
                                if(sbp_all[temp_value].LOGISTIC_PACKAGING_String__c == null || sbp_all[temp_value].LOGISTIC_PACKAGING_String__c == '') sbp_all[temp_value].LOGISTIC_PACKAGING_String__c = '0.00';
                                
                                //if all is 0 don't update  
                                if(sbp_all[temp_value].First_Day__c == 1 && sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c == '0.00' && sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c == '0.00' 
                                    && sbp_all[temp_value].HLRR_String__c == '0.00' && sbp_all[temp_value].NICKEL_String__c == '0.00' && sbp_all[temp_value].ALUMINUM_String__c == '0.00'
                                    && sbp_all[temp_value].MOLYBDENUM_String__c == '0.00' && sbp_all[temp_value].OTHER_METALS_String__c == '0.00' && sbp_all[temp_value].ENG_CHANGES_String__c == '0.00'
                                    && sbp_all[temp_value].OTHER_String__c == '0.00' && sbp_all[temp_value].FX_String__c == '0.00' && sbp_all[temp_value].ENDTOOLAMOR_String__c == '0.00'
                                    && sbp_all[temp_value].ENDRD_EAMOR_String__c == '0.00' && sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c == '0.00'
                                    && sbp_all[temp_value].LOGISTIC_PACKAGING_String__c == '0.00'){
                                    
                                    //do nothing
                                    
                                } else {
                                    //update values  
                                    if(sbp_all[temp_value].First_Day__c != 0 && sbp_all[temp_value].First_Day__c != 1){
                                        sbp_list2[temp_value].First_Day__c = sbp_all[temp_value].First_Day__c;
                                    } 
                                                                        
                                    if(sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c != null && sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c != '' && sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c.contains('%')){
                                        //sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c = sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c.replace('%','');
                                        sbp_all[temp_value].PURE_PRICE_CONTRACTUAL__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].PURE_PRICE_CONTRACTUAL__c = sbp_list2[temp_value].PURE_PRICE_CONTRACTUAL__c + sbp_all[temp_value].PURE_PRICE_CONTRACTUAL__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].PURE_PRICE_CONTRACTUAL__c = sbp_list2[temp_value].PURE_PRICE_CONTRACTUAL__c + decimal.valueOf(sbp_all[temp_value].PURE_PRICE_CONTRACTUAL_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c != null && sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c != '' && sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c.contains('%')){
                                        //sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c = sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c.replace('%','');
                                        sbp_all[temp_value].PURE_PRICE_BIZ_WINS__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].PURE_PRICE_BIZ_WINS__c = sbp_list2[temp_value].PURE_PRICE_BIZ_WINS__c + sbp_all[temp_value].PURE_PRICE_BIZ_WINS__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].PURE_PRICE_BIZ_WINS__c = sbp_list2[temp_value].PURE_PRICE_BIZ_WINS__c + decimal.valueOf(sbp_all[temp_value].PURE_PRICE_BIZ_WINS_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].HLRR_String__c != null && sbp_all[temp_value].HLRR_String__c != '' && sbp_all[temp_value].HLRR_String__c.contains('%')){
                                        //sbp_all[temp_value].HLRR_String__c = sbp_all[temp_value].HLRR_String__c.replace('%','');
                                        sbp_all[temp_value].HLRR__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].HLRR_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].HLRR__c = sbp_list2[temp_value].HLRR__c + sbp_all[temp_value].HLRR__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].HLRR_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].HLRR__c = sbp_list2[temp_value].HLRR__c + decimal.valueOf(sbp_all[temp_value].HLRR_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].NICKEL_String__c != null && sbp_all[temp_value].NICKEL_String__c != '' && sbp_all[temp_value].NICKEL_String__c.contains('%')){
                                        //sbp_all[temp_value].NICKEL_String__c = sbp_all[temp_value].NICKEL_String__c.replace('%','');
                                        sbp_all[temp_value].NICKEL__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].NICKEL_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].NICKEL__c = sbp_list2[temp_value].NICKEL__c + sbp_all[temp_value].NICKEL__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].NICKEL_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].NICKEL__c = sbp_list2[temp_value].NICKEL__c + decimal.valueOf(sbp_all[temp_value].NICKEL_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].ALUMINUM_String__c != null && sbp_all[temp_value].ALUMINUM_String__c != '' && sbp_all[temp_value].ALUMINUM_String__c.contains('%')){
                                        //sbp_all[temp_value].ALUMINUM_String__c = sbp_all[temp_value].ALUMINUM_String__c.replace('%','');
                                        sbp_all[temp_value].ALUMINUM__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].ALUMINUM_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].ALUMINUM__c = sbp_list2[temp_value].ALUMINUM__c + sbp_all[temp_value].ALUMINUM__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].ALUMINUM_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].ALUMINUM__c = sbp_list2[temp_value].ALUMINUM__c + decimal.valueOf(sbp_all[temp_value].ALUMINUM_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].MOLYBDENUM_String__c != null && sbp_all[temp_value].MOLYBDENUM_String__c != '' && sbp_all[temp_value].MOLYBDENUM_String__c.contains('%')){
                                        //sbp_all[temp_value].MOLYBDENUM_String__c = sbp_all[temp_value].MOLYBDENUM_String__c.replace('%','');
                                        sbp_all[temp_value].MOLYBDENUM__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].MOLYBDENUM_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].MOLYBDENUM__c = sbp_list2[temp_value].MOLYBDENUM__c + sbp_all[temp_value].MOLYBDENUM__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].MOLYBDENUM_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].MOLYBDENUM__c = sbp_list2[temp_value].MOLYBDENUM__c + decimal.valueOf(sbp_all[temp_value].MOLYBDENUM_String__c.replace('%',''));
                                    }

                                    if(sbp_all[temp_value].OTHER_METALS_String__c != null && sbp_all[temp_value].OTHER_METALS_String__c != '' && sbp_all[temp_value].OTHER_METALS_String__c.contains('%')){
                                        //sbp_all[temp_value].OTHER_METALS_String__c = sbp_all[temp_value].OTHER_METALS_String__c.replace('%','');
                                        sbp_all[temp_value].OTH_METALS__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].OTHER_METALS_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].OTH_METALS__c = sbp_list2[temp_value].OTH_METALS__c + sbp_all[temp_value].OTH_METALS__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].OTHER_METALS_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].OTH_METALS__c = sbp_list2[temp_value].OTH_METALS__c + decimal.valueOf(sbp_all[temp_value].OTHER_METALS_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].ENG_CHANGES_String__c != null && sbp_all[temp_value].ENG_CHANGES_String__c != '' && sbp_all[temp_value].ENG_CHANGES_String__c.contains('%')){
                                        //sbp_all[temp_value].ENG_CHANGES_String__c = sbp_all[temp_value].ENG_CHANGES_String__c.replace('%','');
                                        sbp_all[temp_value].ENG_CHANGES__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].ENG_CHANGES_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].ENG_CHANGES__c = sbp_list2[temp_value].ENG_CHANGES__c + sbp_all[temp_value].ENG_CHANGES__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].ENG_CHANGES_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].ENG_CHANGES__c = sbp_list2[temp_value].ENG_CHANGES__c + decimal.valueOf(sbp_all[temp_value].ENG_CHANGES_String__c.replace('%',''));
                                    }
                                    
                                     if(sbp_all[temp_value].FX_String__c != null && sbp_all[temp_value].FX_String__c != '' && sbp_all[temp_value].FX_String__c.contains('%')){
                                        //sbp_all[temp_value].FX_String__c = sbp_all[temp_value].FX_String__c.replace('%','');
                                        sbp_all[temp_value].FX__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].FX_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].FX__c = sbp_list2[temp_value].FX__c + sbp_all[temp_value].FX__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].FX_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].FX__c = sbp_list2[temp_value].FX__c + decimal.valueOf(sbp_all[temp_value].FX_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].ENDTOOLAMOR_String__c != null && sbp_all[temp_value].ENDTOOLAMOR_String__c != '' && sbp_all[temp_value].ENDTOOLAMOR_String__c.contains('%')){
                                        //sbp_all[temp_value].ENDTOOLAMOR_String__c = sbp_all[temp_value].ENDTOOLAMOR_String__c.replace('%','');
                                        sbp_all[temp_value].ENDTOOLAMOR__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].ENDTOOLAMOR_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].ENDTOOLAMOR__c = sbp_list2[temp_value].ENDTOOLAMOR__c + sbp_all[temp_value].ENDTOOLAMOR__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].ENDTOOLAMOR_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].ENDTOOLAMOR__c = sbp_list2[temp_value].ENDTOOLAMOR__c + decimal.valueOf(sbp_all[temp_value].ENDTOOLAMOR_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].ENDRD_EAMOR_String__c != null && sbp_all[temp_value].ENDRD_EAMOR_String__c != '' && sbp_all[temp_value].ENDRD_EAMOR_String__c.contains('%')){
                                        //sbp_all[temp_value].ENDRD_EAMOR_String__c = sbp_all[temp_value].ENDRD_EAMOR_String__c.replace('%','');
                                        sbp_all[temp_value].ENDRD_EAMOR__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].ENDRD_EAMOR_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].ENDRD_EAMOR__c = sbp_list2[temp_value].ENDRD_EAMOR__c + sbp_all[temp_value].ENDRD_EAMOR__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].ENDRD_EAMOR_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].ENDRD_EAMOR__c = sbp_list2[temp_value].ENDRD_EAMOR__c + decimal.valueOf(sbp_all[temp_value].ENDRD_EAMOR_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c != null && sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c != '' && sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c.contains('%')){
                                        //sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c = sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c.replace('%','');
                                        sbp_all[temp_value].INTERESTRDE_TOOLAMO__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].INTERESTRDE_TOOLAMO__c = sbp_list2[temp_value].INTERESTRDE_TOOLAMO__c + sbp_all[temp_value].INTERESTRDE_TOOLAMO__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].INTERESTRDE_TOOLAMO__c = sbp_list2[temp_value].INTERESTRDE_TOOLAMO__c + decimal.valueOf(sbp_all[temp_value].INTERESTRDE_TOOLAMO_String__c.replace('%',''));
                                    }
                                    
                                    if(sbp_all[temp_value].LOGISTIC_PACKAGING_String__c != null && sbp_all[temp_value].LOGISTIC_PACKAGING_String__c != '' && sbp_all[temp_value].LOGISTIC_PACKAGING_String__c.contains('%')){
                                        //sbp_all[temp_value].LOGISTIC_PACKAGING_String__c = sbp_all[temp_value].LOGISTIC_PACKAGING_String__c.replace('%','');
                                        sbp_all[temp_value].LOGISTIC_PACKAGING__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].LOGISTIC_PACKAGING_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].LOGISTIC_PACKAGING__c = sbp_list2[temp_value].LOGISTIC_PACKAGING__c + sbp_all[temp_value].LOGISTIC_PACKAGING__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].LOGISTIC_PACKAGING_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].LOGISTIC_PACKAGING__c = sbp_list2[temp_value].LOGISTIC_PACKAGING__c + decimal.valueOf(sbp_all[temp_value].LOGISTIC_PACKAGING_String__c.replace('%',''));
                                    }
                                    
                                    //system.debug('%%%%%%%%%%%%%% DEBUG Other: ' + sbp_all[temp_value].OTHER_String__c + ' ' + sbp_all[temp_value].OTHER__c);
                                    if(sbp_all[temp_value].OTHER_String__c != null && sbp_all[temp_value].OTHER_String__c != '' && sbp_all[temp_value].OTHER_String__c.contains('%')){
                                        //sbp_all[temp_value].OTHER_String__c = sbp_all[temp_value].OTHER_String__c.replace('%','');
                                        sbp_all[temp_value].OTHER__c = sbp_all[temp_value].Lc_Price__c*((Decimal.ValueOf(sbp_all[temp_value].OTHER_String__c.replace('%','')))/100);
                                        sbp_list2[temp_value].OTHER__c = sbp_list2[temp_value].OTHER__c + sbp_all[temp_value].OTHER__c;
                                    } else if(decimal.valueOf(sbp_all[temp_value].OTHER_String__c.replace('%','')) != 0){
                                        sbp_list2[temp_value].OTHER__c = sbp_list2[temp_value].OTHER__c + decimal.valueOf(sbp_all[temp_value].OTHER_String__c.replace('%',''));
                                        system.debug('%%%%%%%%%%%%%% DEBUG Other2: ' + sbp_all[temp_value].OTHER_String__c + ' ' + sbp_list2[temp_value].OTHER__c);
                                    }
                                    
                                    //update with groups of 192 SBPs (8x24<200 whic is Trigger limit)
                                    sbp_temp_list.add(sbp_list2[temp_value]);
                                    if(sbp_temp_list.size() == 192){
                                        system.debug('%%%%%%%%%%%%%% update sbp_temp_list' + sbp_temp_list);
                                        update sbp_temp_list;
                                        sbp_temp_list = new List<OEM_SBPP_Ext_Data__c>();
                                    }
                                }
                            }
                        }
                    
                        if(!sbp_temp_list.isEmpty()){ 
                            system.debug('%%%%%%%%%%%%%% DEBUG update last sbp_temp_list' + sbp_temp_list);
                            update sbp_temp_list;
                            
                        }
                        
                       system.debug ('spIds ' + spIds);     
                       HTT_ShouldBePriceTriggerHandler.update_sbp_sp(spIds);    
                       
                       update salesPlansList;                    
                        
                        
                        //message
                        message = 'Update complete (' + sp_list.size() + ' Sales Plans). Click "Edit All" for a new mass update (this will reset the Grid).';
                        
                        show_update_all = false;
                        
                    } else message = 'Cannot Update more than 90 Sales Plans at once, please restric your search';
                    
                } else message = 'Sales Plan List not found, please try your search again later';

            } else message = 'Sales Plan List not found, please try your search again later';
            
            system.debug('%%%%%%%%%% DEBUG message: ' + message);
        
        } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }           
        
    }
    
    public void updateSingle(){
    
       //try {
        
            //rebuild sbp_single
            system.debug('%%%%%%%%%%%%%% DEBUG update sbp_single_past: ' + sbp_single_past);
            system.debug('%%%%%%%%%%%%%% DEBUG update sbp_single_forecast: ' + sbp_single_forecast);
            
            {ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.INFO,message);
                            ApexPages.addMessage(myMsg);
                        }
            
            //TransposefromWrapper to sbp_single_past and sbp_single_forecast
            system.debug('TransposeFromWrapper ');
            TransposeFromWrapper();
        
            updatePercentage();
            
            sbp_single.clear();
            sbp_single.addAll(sbp_single_past);
            sbp_single.addAll(sbp_single_forecast);
            
            for(OEM_SBPP_Ext_Data__c temp_sbp : sbp_single){
                system.debug('%%%%%%%%%%%%%% DEBUG update sbp_single list: ' + temp_sbp); }
                
           
            //update
            update sbp_single;
            
            system.debug('sbp_single[0].Sales_Plan__r.recordTypeId ' + sbp_single[0].Sales_Plan__r.recordTypeId);
            
            if(LumpSumSPRTId== sbp_single[0].Sales_Plan__r.recordTypeId ){
                
                system.debug('is lump sum');
                CalcImpactSimulation(sbp_single[0].Sales_Plan__c, current_year);
            
            }
            
            //Update parent Sales Plan 
            Set<Id> spIds =  new Set<Id>();
            
            spIds.add(sbp_single[0].Sales_Plan__c);
            
            HTT_ShouldBePriceTriggerHandler.update_sbp_sp(spIds);       
            
            OEM_Sales_Plan_Ext_Data__c salesPlan= new OEM_Sales_Plan_Ext_Data__c();  
            salesPlan.Id=sbp_single[0].Sales_Plan__c;
            salesPlan.Last_Child_Modified_Date__c = System.today(); 
            
            update salesPlan;
            
            sbp_single = getsbp_single();
                        
            hide_sim =true;
            show_sim =false;
            
       /* } catch (Exception e){
         
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }     */      
    }
    
    public void updatePercentage(){
        
        //system.debug('%%%%%%%%%%%%%% DEBUG update sbp_id: ' + sbp_id);
        
        try{
            //if(sbp_id != null){
            for(OEM_SBPP_Ext_Data__c temp_sbp : sbp_single_past){
            
                if(temp_sbp.PURE_PRICE_CONTRACTUAL_String__c == null || temp_sbp.PURE_PRICE_CONTRACTUAL_String__c == '') temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = '0.00';
                if(temp_sbp.PURE_PRICE_BIZ_WINS_String__c == null || temp_sbp.PURE_PRICE_BIZ_WINS_String__c == '') temp_sbp.PURE_PRICE_BIZ_WINS_String__c = '0.00';
                if(temp_sbp.HLRR_String__c == null || temp_sbp.HLRR_String__c == '') temp_sbp.HLRR_String__c = '0.00';
                if(temp_sbp.NICKEL_String__c == null || temp_sbp.NICKEL_String__c == '') temp_sbp.NICKEL_String__c = '0.00';
                if(temp_sbp.ALUMINUM_String__c == null || temp_sbp.ALUMINUM_String__c == '') temp_sbp.ALUMINUM_String__c = '0.00';
                if(temp_sbp.MOLYBDENUM_String__c == null || temp_sbp.MOLYBDENUM_String__c == '') temp_sbp.MOLYBDENUM_String__c = '0.00';
                if(temp_sbp.OTHER_METALS_String__c == null || temp_sbp.OTHER_METALS_String__c == '') temp_sbp.OTHER_METALS_String__c = '0.00';
                if(temp_sbp.ENG_CHANGES_String__c == null || temp_sbp.ENG_CHANGES_String__c == '') temp_sbp.ENG_CHANGES_String__c = '0.00';
                if(temp_sbp.OTHER_String__c == null || temp_sbp.OTHER_String__c == '') temp_sbp.OTHER_String__c = '0.00';
                if(temp_sbp.FX_String__c == null || temp_sbp.FX_String__c == '') temp_sbp.FX_String__c = '0.00';
                if(temp_sbp.ENDTOOLAMOR_String__c == null || temp_sbp.ENDTOOLAMOR_String__c == '') temp_sbp.ENDTOOLAMOR_String__c = '0.00';
                if(temp_sbp.ENDRD_EAMOR_String__c == null || temp_sbp.ENDRD_EAMOR_String__c == '') temp_sbp.ENDRD_EAMOR_String__c = '0.00';
                if(temp_sbp.INTERESTRDE_TOOLAMO_String__c == null || temp_sbp.INTERESTRDE_TOOLAMO_String__c == '') temp_sbp.INTERESTRDE_TOOLAMO_String__c = '0.00';
                if(temp_sbp.LOGISTIC_PACKAGING_String__c == null || temp_sbp.LOGISTIC_PACKAGING_String__c == '') temp_sbp.LOGISTIC_PACKAGING_String__c = '0.00';
            
                if(temp_sbp.PURE_PRICE_CONTRACTUAL_String__c != '' && temp_sbp.PURE_PRICE_CONTRACTUAL_String__c != null && temp_sbp.PURE_PRICE_CONTRACTUAL_String__c.contains('%')){
                    temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = temp_sbp.PURE_PRICE_CONTRACTUAL_String__c.replaceAll('%','');
                    temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = temp_sbp.PURE_PRICE_CONTRACTUAL_String__c.replaceAll(',','.');
                    temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.PURE_PRICE_CONTRACTUAL_String__c)))/100);                      
                }
                temp_sbp.PURE_PRICE_CONTRACTUAL__c = Decimal.valueOf(temp_sbp.PURE_PRICE_CONTRACTUAL_String__c.replaceAll(',','.'));

                if(temp_sbp.PURE_PRICE_BIZ_WINS_String__c != '' && temp_sbp.PURE_PRICE_BIZ_WINS_String__c != null && temp_sbp.PURE_PRICE_BIZ_WINS_String__c.contains('%')){
                    temp_sbp.PURE_PRICE_BIZ_WINS_String__c = temp_sbp.PURE_PRICE_BIZ_WINS_String__c.replaceAll('%','');
                    temp_sbp.PURE_PRICE_BIZ_WINS_String__c = temp_sbp.PURE_PRICE_BIZ_WINS_String__c.replaceAll(',','.');
                    temp_sbp.PURE_PRICE_BIZ_WINS_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.PURE_PRICE_BIZ_WINS_String__c)))/100);                      
                }
                temp_sbp.PURE_PRICE_BIZ_WINS__c = Decimal.valueOf(temp_sbp.PURE_PRICE_BIZ_WINS_String__c.replaceAll(',','.'));              

                if(temp_sbp.HLRR_String__c != '' && temp_sbp.HLRR_String__c != null && temp_sbp.HLRR_String__c.contains('%')){
                    temp_sbp.HLRR_String__c = temp_sbp.HLRR_String__c.replaceAll('%','');
                    temp_sbp.HLRR_String__c = temp_sbp.HLRR_String__c.replaceAll(',','.');
                    temp_sbp.HLRR_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.HLRR_String__c)))/100);                      
                }
                temp_sbp.HLRR__c = Decimal.valueOf(temp_sbp.HLRR_String__c.replaceAll(',','.'));

                if(temp_sbp.NICKEL_String__c != '' && temp_sbp.NICKEL_String__c != null && temp_sbp.NICKEL_String__c.contains('%')){
                    temp_sbp.NICKEL_String__c = temp_sbp.NICKEL_String__c.replaceAll('%','');
                    temp_sbp.NICKEL_String__c = temp_sbp.NICKEL_String__c.replaceAll(',','.');
                    temp_sbp.NICKEL_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.NICKEL_String__c)))/100);                      
                }
                temp_sbp.NICKEL__c = Decimal.valueOf(temp_sbp.NICKEL_String__c.replaceAll(',','.'));
                
                if(temp_sbp.ALUMINUM_String__c != '' && temp_sbp.ALUMINUM_String__c != null && temp_sbp.ALUMINUM_String__c.contains('%')){
                    temp_sbp.ALUMINUM_String__c = temp_sbp.ALUMINUM_String__c.replaceAll('%','');
                    temp_sbp.ALUMINUM_String__c = temp_sbp.ALUMINUM_String__c.replaceAll(',','.');
                    temp_sbp.ALUMINUM_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.ALUMINUM_String__c)))/100);                      
                }
                temp_sbp.ALUMINUM__c = Decimal.valueOf(temp_sbp.ALUMINUM_String__c.replaceAll(',','.'));
                
                if(temp_sbp.MOLYBDENUM_String__c != '' && temp_sbp.MOLYBDENUM_String__c != null && temp_sbp.MOLYBDENUM_String__c.contains('%')){
                    temp_sbp.MOLYBDENUM_String__c = temp_sbp.MOLYBDENUM_String__c.replaceAll('%','');
                    temp_sbp.MOLYBDENUM_String__c = temp_sbp.MOLYBDENUM_String__c.replaceAll(',','.');
                    temp_sbp.MOLYBDENUM_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.MOLYBDENUM_String__c)))/100);                      
                }
                temp_sbp.MOLYBDENUM__c = Decimal.valueOf(temp_sbp.MOLYBDENUM_String__c.replaceAll(',','.'));

                if(temp_sbp.OTHER_METALS_String__c != '' && temp_sbp.OTHER_METALS_String__c != null && temp_sbp.OTHER_METALS_String__c.contains('%')){
                    temp_sbp.OTHER_METALS_String__c = temp_sbp.OTHER_METALS_String__c.replaceAll('%','');
                    temp_sbp.OTHER_METALS_String__c = temp_sbp.OTHER_METALS_String__c.replaceAll(',','.');
                    temp_sbp.OTHER_METALS_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.OTHER_METALS_String__c)))/100);                      
                }
                temp_sbp.OTH_METALS__c = Decimal.valueOf(temp_sbp.OTHER_METALS_String__c.replaceAll(',','.'));
                
                if(temp_sbp.ENG_CHANGES_String__c != '' && temp_sbp.ENG_CHANGES_String__c != null && temp_sbp.ENG_CHANGES_String__c.contains('%')){
                    temp_sbp.ENG_CHANGES_String__c = temp_sbp.ENG_CHANGES_String__c.replaceAll('%','');
                    temp_sbp.ENG_CHANGES_String__c = temp_sbp.ENG_CHANGES_String__c.replaceAll(',','.');
                    temp_sbp.ENG_CHANGES_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.ENG_CHANGES_String__c)))/100);                      
                }
                temp_sbp.ENG_CHANGES__c = Decimal.valueOf(temp_sbp.ENG_CHANGES_String__c.replaceAll(',','.'));
                
                if(temp_sbp.OTHER_String__c != '' && temp_sbp.OTHER_String__c != null && temp_sbp.OTHER_String__c.contains('%')){
                    temp_sbp.OTHER_String__c = temp_sbp.OTHER_String__c.replaceAll('%','');
                    temp_sbp.OTHER_String__c = temp_sbp.OTHER_String__c.replaceAll(',','.');
                    temp_sbp.OTHER_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.OTHER_String__c)))/100);                      
                }
                temp_sbp.OTHER__c = Decimal.valueOf(temp_sbp.OTHER_String__c.replaceAll(',','.'));
                
                if(temp_sbp.FX_String__c != '' && temp_sbp.FX_String__c != null && temp_sbp.FX_String__c.contains('%')){
                    temp_sbp.FX_String__c = temp_sbp.FX_String__c.replaceAll('%','');
                    temp_sbp.FX_String__c = temp_sbp.FX_String__c.replaceAll(',','.');
                    temp_sbp.FX_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.FX_String__c)))/100);                      
                }
                temp_sbp.FX__c = Decimal.valueOf(temp_sbp.FX_String__c.replaceAll(',','.'));
                
                if(temp_sbp.ENDTOOLAMOR_String__c != '' && temp_sbp.ENDTOOLAMOR_String__c != null && temp_sbp.ENDTOOLAMOR_String__c.contains('%')){
                    temp_sbp.ENDTOOLAMOR_String__c = temp_sbp.ENDTOOLAMOR_String__c.replaceAll('%','');
                    temp_sbp.ENDTOOLAMOR_String__c = temp_sbp.ENDTOOLAMOR_String__c.replaceAll(',','.');
                    temp_sbp.ENDTOOLAMOR_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.ENDTOOLAMOR_String__c)))/100);                      
                }
                temp_sbp.ENDTOOLAMOR__c = Decimal.valueOf(temp_sbp.ENDTOOLAMOR_String__c.replaceAll(',','.'));
                
                if(temp_sbp.ENDRD_EAMOR_String__c != '' && temp_sbp.ENDRD_EAMOR_String__c != null && temp_sbp.ENDRD_EAMOR_String__c.contains('%')){
                    temp_sbp.ENDRD_EAMOR_String__c = temp_sbp.ENDRD_EAMOR_String__c.replaceAll('%','');
                    temp_sbp.ENDRD_EAMOR_String__c = temp_sbp.ENDRD_EAMOR_String__c.replaceAll(',','.');
                    temp_sbp.ENDRD_EAMOR_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.ENDRD_EAMOR_String__c)))/100);                      
                }
                temp_sbp.ENDRD_EAMOR__c = Decimal.valueOf(temp_sbp.ENDRD_EAMOR_String__c.replaceAll(',','.'));
                
                if(temp_sbp.INTERESTRDE_TOOLAMO_String__c != '' && temp_sbp.INTERESTRDE_TOOLAMO_String__c != null && temp_sbp.INTERESTRDE_TOOLAMO_String__c.contains('%')){
                    temp_sbp.INTERESTRDE_TOOLAMO_String__c = temp_sbp.INTERESTRDE_TOOLAMO_String__c.replaceAll('%','');
                    temp_sbp.INTERESTRDE_TOOLAMO_String__c = temp_sbp.INTERESTRDE_TOOLAMO_String__c.replaceAll(',','.');
                    temp_sbp.INTERESTRDE_TOOLAMO_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.INTERESTRDE_TOOLAMO_String__c)))/100);                      
                }
                temp_sbp.INTERESTRDE_TOOLAMO__c = Decimal.valueOf(temp_sbp.INTERESTRDE_TOOLAMO_String__c.replaceAll(',','.'));
                
                if(temp_sbp.LOGISTIC_PACKAGING_String__c != '' && temp_sbp.LOGISTIC_PACKAGING_String__c != null && temp_sbp.LOGISTIC_PACKAGING_String__c.contains('%')){
                    temp_sbp.LOGISTIC_PACKAGING_String__c = temp_sbp.LOGISTIC_PACKAGING_String__c.replaceAll('%','');
                    temp_sbp.LOGISTIC_PACKAGING_String__c = temp_sbp.LOGISTIC_PACKAGING_String__c.replaceAll(',','.');
                    temp_sbp.LOGISTIC_PACKAGING_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.LOGISTIC_PACKAGING_String__c)))/100);                      
                }
                temp_sbp.LOGISTIC_PACKAGING__c = Decimal.valueOf(temp_sbp.LOGISTIC_PACKAGING_String__c.replaceAll(',','.'));
                
                //system.debug('$$$$$$$$$$$$$$ DEBUG String: '  + temp_sbp);
                    
            }
            
            for(OEM_SBPP_Ext_Data__c temp_sbp : sbp_single_forecast){
            
                if(temp_sbp.PURE_PRICE_CONTRACTUAL_String__c == null || temp_sbp.PURE_PRICE_CONTRACTUAL_String__c == '') temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = '0.00';
                if(temp_sbp.PURE_PRICE_BIZ_WINS_String__c == null || temp_sbp.PURE_PRICE_BIZ_WINS_String__c == '') temp_sbp.PURE_PRICE_BIZ_WINS_String__c = '0.00';
                if(temp_sbp.HLRR_String__c == null || temp_sbp.HLRR_String__c == '') temp_sbp.HLRR_String__c = '0.00';
                if(temp_sbp.NICKEL_String__c == null || temp_sbp.NICKEL_String__c == '') temp_sbp.NICKEL_String__c = '0.00';
                if(temp_sbp.ALUMINUM_String__c == null || temp_sbp.ALUMINUM_String__c == '') temp_sbp.ALUMINUM_String__c = '0.00';
                if(temp_sbp.MOLYBDENUM_String__c == null || temp_sbp.MOLYBDENUM_String__c == '') temp_sbp.MOLYBDENUM_String__c = '0.00';
                if(temp_sbp.OTHER_METALS_String__c == null || temp_sbp.OTHER_METALS_String__c == '') temp_sbp.OTHER_METALS_String__c = '0.00';
                if(temp_sbp.ENG_CHANGES_String__c == null || temp_sbp.ENG_CHANGES_String__c == '') temp_sbp.ENG_CHANGES_String__c = '0.00';
                if(temp_sbp.OTHER_String__c == null || temp_sbp.OTHER_String__c == '') temp_sbp.OTHER_String__c = '0.00';
                if(temp_sbp.FX_String__c == null || temp_sbp.FX_String__c == '') temp_sbp.FX_String__c = '0.00';
                if(temp_sbp.ENDTOOLAMOR_String__c == null || temp_sbp.ENDTOOLAMOR_String__c == '') temp_sbp.ENDTOOLAMOR_String__c = '0.00';
                if(temp_sbp.ENDRD_EAMOR_String__c == null || temp_sbp.ENDRD_EAMOR_String__c == '') temp_sbp.ENDRD_EAMOR_String__c = '0.00';
                if(temp_sbp.INTERESTRDE_TOOLAMO_String__c == null || temp_sbp.INTERESTRDE_TOOLAMO_String__c == '') temp_sbp.INTERESTRDE_TOOLAMO_String__c = '0.00';
                if(temp_sbp.LOGISTIC_PACKAGING_String__c == null || temp_sbp.LOGISTIC_PACKAGING_String__c == '') temp_sbp.LOGISTIC_PACKAGING_String__c = '0.00';
            
                if(temp_sbp.PURE_PRICE_CONTRACTUAL_String__c != '' && temp_sbp.PURE_PRICE_CONTRACTUAL_String__c != null && temp_sbp.PURE_PRICE_CONTRACTUAL_String__c.contains('%')){
                    temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = temp_sbp.PURE_PRICE_CONTRACTUAL_String__c.replaceAll('%','');
                    temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = temp_sbp.PURE_PRICE_CONTRACTUAL_String__c.replaceAll(',','.');
                    temp_sbp.PURE_PRICE_CONTRACTUAL_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.PURE_PRICE_CONTRACTUAL_String__c)))/100);                      
                }
                temp_sbp.PURE_PRICE_CONTRACTUAL__c = Decimal.valueOf(temp_sbp.PURE_PRICE_CONTRACTUAL_String__c.replaceAll(',','.'));

                if(temp_sbp.PURE_PRICE_BIZ_WINS_String__c != '' && temp_sbp.PURE_PRICE_BIZ_WINS_String__c != null && temp_sbp.PURE_PRICE_BIZ_WINS_String__c.contains('%')){
                    temp_sbp.PURE_PRICE_BIZ_WINS_String__c = temp_sbp.PURE_PRICE_BIZ_WINS_String__c.replaceAll('%','');
                    temp_sbp.PURE_PRICE_BIZ_WINS_String__c = temp_sbp.PURE_PRICE_BIZ_WINS_String__c.replaceAll(',','.');
                    temp_sbp.PURE_PRICE_BIZ_WINS_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.PURE_PRICE_BIZ_WINS_String__c)))/100);                      
                }
                temp_sbp.PURE_PRICE_BIZ_WINS__c = Decimal.valueOf(temp_sbp.PURE_PRICE_BIZ_WINS_String__c.replaceAll(',','.'));              

                if(temp_sbp.HLRR_String__c != '' && temp_sbp.HLRR_String__c != null && temp_sbp.HLRR_String__c.contains('%')){
                    temp_sbp.HLRR_String__c = temp_sbp.HLRR_String__c.replaceAll('%','');
                    temp_sbp.HLRR_String__c = temp_sbp.HLRR_String__c.replaceAll(',','.');
                    temp_sbp.HLRR_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.HLRR_String__c)))/100);                      
                }
                temp_sbp.HLRR__c = Decimal.valueOf(temp_sbp.HLRR_String__c.replaceAll(',','.'));

                if(temp_sbp.NICKEL_String__c != '' && temp_sbp.NICKEL_String__c != null && temp_sbp.NICKEL_String__c.contains('%')){
                    temp_sbp.NICKEL_String__c = temp_sbp.NICKEL_String__c.replaceAll('%','');
                    temp_sbp.NICKEL_String__c = temp_sbp.NICKEL_String__c.replaceAll(',','.');
                    temp_sbp.NICKEL_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.NICKEL_String__c)))/100);                      
                }
                temp_sbp.NICKEL__c = Decimal.valueOf(temp_sbp.NICKEL_String__c.replaceAll(',','.'));
                
                if(temp_sbp.ALUMINUM_String__c != '' && temp_sbp.ALUMINUM_String__c != null && temp_sbp.ALUMINUM_String__c.contains('%')){
                    temp_sbp.ALUMINUM_String__c = temp_sbp.ALUMINUM_String__c.replaceAll('%','');
                    temp_sbp.ALUMINUM_String__c = temp_sbp.ALUMINUM_String__c.replaceAll(',','.');
                    temp_sbp.ALUMINUM_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.ALUMINUM_String__c)))/100);                      
                }
                temp_sbp.ALUMINUM__c = Decimal.valueOf(temp_sbp.ALUMINUM_String__c.replaceAll(',','.'));
                
                if(temp_sbp.MOLYBDENUM_String__c != '' && temp_sbp.MOLYBDENUM_String__c != null && temp_sbp.MOLYBDENUM_String__c.contains('%')){
                    temp_sbp.MOLYBDENUM_String__c = temp_sbp.MOLYBDENUM_String__c.replaceAll('%','');
                    temp_sbp.MOLYBDENUM_String__c = temp_sbp.MOLYBDENUM_String__c.replaceAll(',','.');
                    temp_sbp.MOLYBDENUM_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.MOLYBDENUM_String__c)))/100);                      
                }
                temp_sbp.MOLYBDENUM__c = Decimal.valueOf(temp_sbp.MOLYBDENUM_String__c.replaceAll(',','.'));

                if(temp_sbp.OTHER_METALS_String__c != '' && temp_sbp.OTHER_METALS_String__c != null && temp_sbp.OTHER_METALS_String__c.contains('%')){
                    temp_sbp.OTHER_METALS_String__c = temp_sbp.OTHER_METALS_String__c.replaceAll('%','');
                    temp_sbp.OTHER_METALS_String__c = temp_sbp.OTHER_METALS_String__c.replaceAll(',','.');
                    temp_sbp.OTHER_METALS_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.OTHER_METALS_String__c)))/100);                      
                }
                temp_sbp.OTH_METALS__c = Decimal.valueOf(temp_sbp.OTHER_METALS_String__c.replaceAll(',','.'));
                
                if(temp_sbp.ENG_CHANGES_String__c != '' && temp_sbp.ENG_CHANGES_String__c != null && temp_sbp.ENG_CHANGES_String__c.contains('%')){
                    temp_sbp.ENG_CHANGES_String__c = temp_sbp.ENG_CHANGES_String__c.replaceAll('%','');
                    temp_sbp.ENG_CHANGES_String__c = temp_sbp.ENG_CHANGES_String__c.replaceAll(',','.');
                    temp_sbp.ENG_CHANGES_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.ENG_CHANGES_String__c)))/100);                      
                }
                temp_sbp.ENG_CHANGES__c = Decimal.valueOf(temp_sbp.ENG_CHANGES_String__c.replaceAll(',','.'));
            
                if(temp_sbp.OTHER_String__c != '' && temp_sbp.OTHER_String__c != null && temp_sbp.OTHER_String__c.contains('%')){
                    temp_sbp.OTHER_String__c = temp_sbp.OTHER_String__c.replaceAll('%','');
                    temp_sbp.OTHER_String__c = temp_sbp.OTHER_String__c.replaceAll(',','.');
                    temp_sbp.OTHER_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.OTHER_String__c)))/100);                          
                }
                temp_sbp.OTHER__c = Decimal.valueOf(temp_sbp.OTHER_String__c.replaceAll(',','.'));
                
                if(temp_sbp.FX_String__c != '' && temp_sbp.FX_String__c != null && temp_sbp.FX_String__c.contains('%')){
                    temp_sbp.FX_String__c = temp_sbp.FX_String__c.replaceAll('%','');
                    temp_sbp.FX_String__c = temp_sbp.FX_String__c.replaceAll(',','.');
                    temp_sbp.FX_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.FX_String__c)))/100);                      
                }
                temp_sbp.FX__c = Decimal.valueOf(temp_sbp.FX_String__c.replaceAll(',','.'));
                
                if(temp_sbp.ENDTOOLAMOR_String__c != '' && temp_sbp.ENDTOOLAMOR_String__c != null && temp_sbp.ENDTOOLAMOR_String__c.contains('%')){
                    temp_sbp.ENDTOOLAMOR_String__c = temp_sbp.ENDTOOLAMOR_String__c.replaceAll('%','');
                    temp_sbp.ENDTOOLAMOR_String__c = temp_sbp.ENDTOOLAMOR_String__c.replaceAll(',','.');
                    temp_sbp.ENDTOOLAMOR_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.ENDTOOLAMOR_String__c)))/100);                      
                }
                temp_sbp.ENDTOOLAMOR__c = Decimal.valueOf(temp_sbp.ENDTOOLAMOR_String__c.replaceAll(',','.'));                
                
                if(temp_sbp.ENDRD_EAMOR_String__c != '' && temp_sbp.ENDRD_EAMOR_String__c != null && temp_sbp.ENDRD_EAMOR_String__c.contains('%')){
                    temp_sbp.ENDRD_EAMOR_String__c = temp_sbp.ENDRD_EAMOR_String__c.replaceAll('%','');
                    temp_sbp.ENDRD_EAMOR_String__c = temp_sbp.ENDRD_EAMOR_String__c.replaceAll(',','.');
                    temp_sbp.ENDRD_EAMOR_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.ENDRD_EAMOR_String__c)))/100);                      
                }
                temp_sbp.ENDRD_EAMOR__c = Decimal.valueOf(temp_sbp.ENDRD_EAMOR_String__c.replaceAll(',','.'));
                
                if(temp_sbp.INTERESTRDE_TOOLAMO_String__c != '' && temp_sbp.INTERESTRDE_TOOLAMO_String__c != null && temp_sbp.INTERESTRDE_TOOLAMO_String__c.contains('%')){
                    temp_sbp.INTERESTRDE_TOOLAMO_String__c = temp_sbp.INTERESTRDE_TOOLAMO_String__c.replaceAll('%','');
                    temp_sbp.INTERESTRDE_TOOLAMO_String__c = temp_sbp.INTERESTRDE_TOOLAMO_String__c.replaceAll(',','.');
                    temp_sbp.INTERESTRDE_TOOLAMO_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.INTERESTRDE_TOOLAMO_String__c)))/100);                      
                }
                temp_sbp.INTERESTRDE_TOOLAMO__c = Decimal.valueOf(temp_sbp.INTERESTRDE_TOOLAMO_String__c.replaceAll(',','.'));
                
                if(temp_sbp.LOGISTIC_PACKAGING_String__c != '' && temp_sbp.LOGISTIC_PACKAGING_String__c != null && temp_sbp.LOGISTIC_PACKAGING_String__c.contains('%')){
                    temp_sbp.LOGISTIC_PACKAGING_String__c = temp_sbp.LOGISTIC_PACKAGING_String__c.replaceAll('%','');
                    temp_sbp.LOGISTIC_PACKAGING_String__c = temp_sbp.LOGISTIC_PACKAGING_String__c.replaceAll(',','.');
                    temp_sbp.LOGISTIC_PACKAGING_String__c = String.ValueOf((temp_sbp.Lc_Price__c*(Decimal.ValueOf(temp_sbp.LOGISTIC_PACKAGING_String__c)))/100);                      
                }
                temp_sbp.LOGISTIC_PACKAGING__c = Decimal.valueOf(temp_sbp.LOGISTIC_PACKAGING_String__c.replaceAll(',','.'));
                
                //system.debug('$$$$$$$$$$$$$$ DEBUG OTHER__c: '  + temp_sbp.OTHER__c);
            
            }
            //}
        } catch (Exception e){
        
            message2 = 'ERROR: ' + e;
            system.debug('%%%%%%%%%%% DEBUG EXCEPTION: ' + e);
        }
    }
    
    public void doNothing(){}
    
    public void unselectAll(){
        salesPlanIdsToExport = '';
    }
    
    public void selectAll(){
        System.debug('Entra in selectall()');
        salesPlanIdsToExport = '';
      
        for(sales_plan_list sp_temp1 : sp_list_table){
            
            salesPlanIdsToExport+=''+sp_temp1.sp.Id+',';
        }
        
    }
    
   /* public PageReference exportSelectedSalesPlan(){
        System.debug('HTT_ShouldBePrice_editPage::exportSelectedSalesPlan::Enter method!');
        System.debug('HTT_ShouldBePrice_editPage::exportSelectedSalesPlan::salesPlanIds='+salesPlanIds);
        System.debug('HTT_ShouldBePrice_editPage::exportSelectedSalesPlan::salesPlanIdsToExport='+salesPlanIdsToExport);
        PageReference pageRef = HTT_ShouldBePriceExportController.exportSelectedSalesPlan(salesPlanIdsToExport);
        return pageRef;
        
    }*/
    
    
    // Wrapper Class to Transpose the layout
    public class SBPListWrapper
    {
        public String varPrice_RC { get; set; } 
        public String varM1Y0 { get; set; }
        public String varM2Y0 { get; set; }
        public String varM3Y0 { get; set; }
        public String varM4Y0 { get; set; }
        public String varM5Y0 { get; set; }
        public String varM6Y0 { get; set; }
        public String varM7Y0 { get; set; }
        public String varM8Y0 { get; set; }
        public String varM9Y0 { get; set; }
        public String varM10Y0 { get; set; }
        public String varM11Y0 { get; set; }
        public String varM12Y0 { get; set; }
        public String varM1Y1 { get; set; }
        public String varM2Y1 { get; set; }
        public String varM3Y1 { get; set; }
        public String varM4Y1 { get; set; }
        public String varM5Y1 { get; set; }
        public String varM6Y1 { get; set; }
        public String varM7Y1 { get; set; }
        public String varM8Y1 { get; set; }
        public String varM9Y1 { get; set; }
        public String varM10Y1 { get; set; }
        public String varM11Y1 { get; set; }
        public String varM12Y1 { get; set; }
        public String varM1Y2 { get; set; }
        public String varM2Y2 { get; set; }
        public String varM3Y2 { get; set; }
        public String varM4Y2 { get; set; }
        public String varM5Y2 { get; set; }
        public String varM6Y2 { get; set; }
        public String varM7Y2 { get; set; }
        public String varM8Y2 { get; set; }
        public String varM9Y2 { get; set; }
        public String varM10Y2 { get; set; }
        public String varM11Y2 { get; set; }
        public String varM12Y2 { get; set; }
        
        public SBPListWrapper(){}
        /*public SBPListWrapper(String Price_RC,
                              String M1Y1,String M2Y1,String M3Y1,String M4Y1,String M5Y1,String M6Y1,
                              String M7Y1,String M8Y1,String M9Y1,String M10Y1,String M11Y1,String M12Y1,String M1Y2,
                              String M2Y2, String M3Y2,String M4Y2,String M5Y2,String M6Y2,String M7Y2,String M8Y2,
                              String M9Y2, String M10Y2, String M11Y2, String M12Y2)
        {
            varPrice_RC = Price_RC;
            varM1Y1 = M1Y1;
            varM2Y1 = M2Y1; 
            varM3Y1 = M3Y1;
            varM4Y1 = M4Y1;
            varM5Y1 = M5Y1;
            varM6Y1 = M6Y1;
            varM7Y1 = M7Y1;
            varM8Y1 = M8Y1; 
            varM9Y1 = M9Y1;
            varM10Y1 = M10Y1;
            varM11Y1 = M11Y1;
            varM12Y1 = M12Y1;
            varM1Y2 = M1Y2;
            varM2Y2 = M2Y2; 
            varM3Y2 = M3Y2;
            varM4Y2 = M4Y2;
            varM5Y2 = M5Y2;
            varM6Y2 = M6Y2;
            varM7Y2 = M7Y2;
            varM8Y2 = M8Y2; 
            varM9Y2 = M9Y2;
            varM10Y2 = M10Y2;
            varM11Y2 = M11Y2;
            varM12Y2 = M12Y2;

        }*/
    } 
    
    
    // Wrapper Class for Price Split 
    public class SBPPSWrapper
    {
        public String varPrice_RC { get; set; }  
        public String varType { get; set; } 
        public String varM1Y0 { get; set; }
        public String varM2Y0 { get; set; }
        public String varM3Y0 { get; set; }
        public String varM4Y0 { get; set; }
        public String varM5Y0 { get; set; }
        public String varM6Y0 { get; set; }
        public String varM7Y0 { get; set; }
        public String varM8Y0 { get; set; }
        public String varM9Y0 { get; set; }
        public String varM10Y0 { get; set; }
        public String varM11Y0 { get; set; }
        public String varM12Y0 { get; set; }
        public String varM1Y1 { get; set; }
        public String varM2Y1 { get; set; }
        public String varM3Y1 { get; set; }
        public String varM4Y1 { get; set; }
        public String varM5Y1 { get; set; }
        public String varM6Y1 { get; set; }
        public String varM7Y1 { get; set; }
        public String varM8Y1 { get; set; }
        public String varM9Y1 { get; set; }
        public String varM10Y1 { get; set; }
        public String varM11Y1 { get; set; }
        public String varM12Y1 { get; set; }
        public String varM1Y2 { get; set; }
        public String varM2Y2 { get; set; }
        public String varM3Y2 { get; set; }
        public String varM4Y2 { get; set; }
        public String varM5Y2 { get; set; }
        public String varM6Y2 { get; set; }
        public String varM7Y2 { get; set; }
        public String varM8Y2 { get; set; }
        public String varM9Y2 { get; set; }
        public String varM10Y2 { get; set; }
        public String varM11Y2 { get; set; }
        public String varM12Y2 { get; set; }
        
        public SBPPSWrapper(){}
    } 
    
    
    //Simulation Wrapper
    public class SBPSimWrapper
    {
        public String varReasonCode { get; set; }
        public Decimal varCO_prevy { get; set; }
        public Decimal varCurrY_App { get; set; }
        public Decimal varCurrY_Sub { get; set; }
        public Decimal varCurrY { get; set; }
        public Decimal varTotCurrY { get; set; }
        public Decimal varAOP { get; set; }
        public Decimal varVsAOP { get; set; }
        public Decimal varCO_nexty { get; set; }
        public SBPSimWrapper(String ReasonCode, Decimal CO_prevy,Decimal CurrY_App, Decimal CurrY_Sub, Decimal CurrY,Decimal TotCurrY,Decimal AOP,Decimal VsAOP, Decimal CO_nexty )
        {
            varReasonCode = ReasonCode; 
            varCO_prevy = CO_prevy;
            varCurrY_App = CurrY_App;
            varCurrY_Sub = CurrY_Sub;
            varCurrY = CurrY;
            varTotCurrY = TotCurrY;
            varAOP = AOP;
            varVsAOP = VsAOP;
            varCO_nexty = CO_nexty;
        }   
    
    }
    
    public class SBPSimDetWrapper
    {
        public String varReasonCode { get; set; }
        public String varType { get; set; }
        public Decimal varAnnual { get; set; }
        public Decimal varM1 { get; set; }
        public Decimal varM2 { get; set; }
        public Decimal varM3 { get; set; }
        public Decimal varM4 { get; set; }
        public Decimal varM5 { get; set; }
        public Decimal varM6 { get; set; }
        public Decimal varM7 { get; set; }
        public Decimal varM8 { get; set; }
        public Decimal varM9 { get; set; }
        public Decimal varM10 { get; set; }
        public Decimal varM11 { get; set; }
        public Decimal varM12 { get; set; }
        public SBPSimDetWrapper(String ReasonCode,String Type,Decimal Annual,Decimal M1,Decimal M2,Decimal M3, Decimal M4,Decimal M5,Decimal M6,Decimal M7,
                             Decimal M8, Decimal M9, Decimal M10, Decimal M11, Decimal M12)
        {
            varReasonCode = ReasonCode; 
            varType = Type;
            varAnnual = Annual;
            varM1 = M1;
            varM2 = M2;
            varM3 = M3;
            varM4 = M4;
            varM5 = M5;
            varM6 = M6;
            varM7 = M7;
            varM8 = M8;
            varM9 = M9;
            varM10 = M10;
            varM11 = M11;
            varM12 = M12;
        }   
    
    }
    
    }