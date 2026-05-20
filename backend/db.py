import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Abc1234@8106",
        database="disaster_management"
    )