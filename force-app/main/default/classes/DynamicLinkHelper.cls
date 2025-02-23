public with sharing class DynamicLinkHelper {
  @AuraEnabled(cacheable=true)
  public static DynamicLink__c getDynamicLinkByIdentity(String identifier) {
    return [
      SELECT
        Id,
        Name,
        App_API_Name__c,
        Identity__c,
        Object__c,
        Page_Name__c,
        Relationship_API_Name__c,
        Text_Value__c,
        Where_Condition__c,
        RecordType.DeveloperName,
        Page__c,
        Link__c
      FROM DynamicLink__c
      WHERE Identity__c = :identifier
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<SObject> getObjectIdFromQuery(
    String objectAPIName,
    String whereCondition
  ) {
    //create and execute select id query from objectAPIName and where condition variables
    if (String.isEmpty(objectAPIName)) {
      throw new AuraHandledException(
        'Object API Name cannot be null or empty.'
      );
    }
    if (String.isEmpty(whereCondition)) {
      throw new AuraHandledException(
        'Where Condition cannot be null or empty.'
      );
    }
    try {
      String query =
        'SELECT Id FROM ' +
        objectAPIName +
        ' WHERE ' +
        whereCondition;
      return Database.query(query);
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static List<SObject> getRecordIdFromDynamicLinkType(
    String dyanmicLinkType,
    String whereCondition
  ) {
    if (String.isEmpty(dyanmicLinkType)) {
      throw new AuraHandledException(
        'DynamicLinkType cannot be null or empty.'
      );
    }
    if (String.isEmpty(whereCondition)) {
      throw new AuraHandledException(
        'Where Condition cannot be null or empty.'
      );
    }
    try {
      String query = '';
      switch on dyanmicLinkType {
        when 'SurveyRecordPage' {
          query =
            'Select Id from SurveyVersion Where SurveyId in (Select Id from Survey Where ' +
            whereCondition +
            ') Order by VersionNumber DESC Limit 1';
        }
        when 'FlowRecordPage' {
          query =
            'SELECT ActiveVersionId FROM FlowDefinitionView WHERE ' +
            whereCondition +
            ' LIMIT 1';
        }
        when 'DPERecordPage' {
          query =
            'SELECT Id FROM BatchCalcJobDefinition WHERE ' +
            whereCondition +
            ' LIMIT 1';
        }
      }

      return Database.query(query);
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}