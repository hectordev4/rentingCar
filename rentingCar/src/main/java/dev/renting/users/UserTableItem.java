package dev.renting.users;


import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@DynamoDbBean
public abstract class UserTableItem {
    private String userIdPK; // Partition Key
    private String operationSK; // Sort Key

    @DynamoDbPartitionKey
    public String getUserIdPk() { return userIdPK; }
    public void setUserIdPk(String userIdPK) { this.userIdPK = userIdPK; }

    @DynamoDbSortKey
    public String getOperationSK() { return operationSK; }
    public void setOperationSK(String operationSK) { this.operationSK = operationSK;}

}
