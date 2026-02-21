#!/usr/bin/env python
"""Check what tables exist in database"""

import sqlite3

conn = sqlite3.connect('test.db')
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print('Tables in database:')
for table in tables:
    print(f'  - {table[0]}')

if not tables:
    print('\nNo tables found! Database is empty.')
else:
    # Show users table schema
    print('\nUsers table schema:')
    cursor.execute("PRAGMA table_info(users);")
    columns = cursor.fetchall()
    for col in columns:
        print(f'  {col}')

conn.close()
