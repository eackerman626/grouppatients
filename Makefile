start: 
	docker-compose up --build

stop: 
	docker-compose down

test: 
	docker-compose run backend pytest

ssh: 
	docker-compose run backend bash
