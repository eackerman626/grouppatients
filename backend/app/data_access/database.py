from curses import echo
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import sys

testing = False
if "pytest" in sys.modules:
    testing = True
if testing:
    DATABASE_URL = os.environ.get("TEST_DATABASE_URL")
    print(f"Using test database {DATABASE_URL}")
else:
    DATABASE_URL = os.environ.get("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
