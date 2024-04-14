def initialize_concert_hall(rows, seats_per_row):
    return [['O' for _ in range(seats_per_row)] for _ in range(rows)]

def block_seats(concert_hall, row, start_col, end_col):
    for col in range(start_col, end_col + 1):
        concert_hall[row][col] = 'B'

def book_seats(concert_hall, row, group_size):
    booked_seats = []
    available_seats = [i for i, seat in enumerate(concert_hall[row]) if seat == 'O']
    if len(available_seats) >= group_size:
        booked_seats = available_seats[:group_size]
        for seat in booked_seats:
            concert_hall[row][seat] = 'X'
    return booked_seats

def display_seat_availability(concert_hall):
    for row in concert_hall:
        print(' '.join(row))

def main():
    rows = int(input())
    seats_per_row = int(input())
    concert_hall = initialize_concert_hall(rows, seats_per_row)

    block_row = int(input())
    start_col = int(input())
    end_col = int(input())
    block_seats(concert_hall, block_row, start_col, end_col)

    preferred_row = int(input())

    group_size = int(input())
    booked_seats = book_seats(concert_hall, preferred_row, group_size)

    print("\nSeat Availability:")
    display_seat_availability(concert_hall)
    print("Booked seats:", ' '.join(map(str, booked_seats)))

if __name__ == "__main__":
    main()
