// UserRepositoryImpl.java
package dev.renting.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private final DynamoDbEnhancedClient enhancedClient;
    private final String tableName = "Users";

    @Autowired
    public UserRepositoryImpl(DynamoDbEnhancedClient enhancedClient) {
        this.enhancedClient = enhancedClient;
    }


    @Override
    public <T> void save(T item) {
        DynamoDbTable<T> table =
                enhancedClient.table(
                        tableName,
                        TableSchema.fromBean((Class<T>) item.getClass()));
        table.putItem(item);
    }

    @Override
    public List<Booking> findBookingsByUserId(String userId) {
        DynamoDbTable<Booking> table = enhancedClient.table(tableName, TableSchema.fromBean(Booking.class));
        List<Booking> bookings = new ArrayList<>();
        Iterator<Booking> results = table.query(
                r -> r.queryConditional(
                        QueryConditional.sortBeginsWith(
                                Key.builder()
                                        .partitionValue(userId)
                                        .sortValue("booking")
                                        .build()
                        )
                )
        ).items().iterator();

        results.forEachRemaining(bookings::add);
        return bookings;
    }

    @Override
    public Optional<User> findById(String userId) {
        DynamoDbTable<User> table = enhancedClient.table(tableName, TableSchema.fromBean(User.class));
        User user = table.getItem(Key.builder().partitionValue(userId).build());
        return Optional.ofNullable(user);
    }

}
