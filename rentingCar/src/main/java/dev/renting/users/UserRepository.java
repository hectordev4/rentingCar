// UserRepository.java
package dev.renting.users;

public interface UserRepository {

    <T extends User> void save(T item);

    <T extends Booking> void save (T item);
}
