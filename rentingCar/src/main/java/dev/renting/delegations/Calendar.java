package dev.renting.delegations;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

import java.util.Map;

@DynamoDbBean
public class Calendar {
    private String delegationId;
    private String operation;
    private Map<String, Boolean> dates;

    @DynamoDbPartitionKey
    public String getDelegationId() {
        return delegationId;
    }
    public void setDelegationId(String delegationId) {
        this.delegationId = delegationId;
    }

    @DynamoDbSortKey
    public String getOperation() {
        return operation;
    }
    public void setOperation(String operation) {
        this.operation = operation;
    }


    public Map<String, Boolean> getDates() {
        return dates;
    }
    public void setDates(Map<String, Boolean> dates) {
        this.dates = dates;
    }
}