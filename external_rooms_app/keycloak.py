import requests
import json

from os.path import join
from setup_env import MAGNIFY_API_URL, KEYCLOAK_URL

def get_admin_token():
	""" Fetch an admin token from Keyckoak """
	url = join(KEYCLOAK_URL,'realms/master/protocol/openid-connect/token')
	headers = {'Content-Type':'application/x-www-form-urlencoded'}
	data = {"username":"admin", "password":"admin", "grant_type":"password", "client_id":"admin-cli"}

	x = requests.post(url, headers=headers, data=data)
	if not x.ok:
		raise Exception('Could not get admin token: ' + x.text)

	return x.json()['access_token']

def create_user(firstname, lastname, username, email, password):
	""" Create a user on Keycloak """
	url = join(KEYCLOAK_URL,'admin/realms/magnify/users')
	headers = {'Content-Type':'application/json', 'Authorization':'Bearer ' + get_admin_token()}
	string = f'{{"firstName":"{firstname}", "lastName":"{lastname}", "email":"{email}", "enabled":"true", "username":"{username}", "credentials":[{{"type":"password","value":"{password}","temporary":false}}]}}'
	data = json.loads(string)

	x = requests.post(url, data=json.dumps(data), headers=headers)
	if not x.ok:
		raise Exception('Could not create user: ' + x.text)

def get_OIDC(username, password):
	""" Fetch an OIDC from Keycloak matching the user 'username' """
	url = join(KEYCLOAK_URL,'realms/magnify/protocol/openid-connect/token')
	headers = {'Content-Type':'application/x-www-form-urlencoded'}
	data = {"username": f"{username}", "password": f"{password}", "grant_type": "password", "client_id": "magnify-front"}

	x = requests.post(url, headers=headers, data=data)
	if not x.ok:
		raise Exception('Could not get user OIDC: ' + x.text)

	return x.json()['access_token']

def create_room(OIDC, name):
	""" Create a room in Magnify """
	url = join(MAGNIFY_API_URL,'api/rooms/')
	headers = {'Content-Type':'application/json', 'Authorization':'Bearer ' + OIDC}
	string = f'{{"name":"{name}","is_public":true}}'
	data = json.loads(string)

	x = requests.post(url=url, headers=headers, data=json.dumps(data))
	if not x.ok:
		raise Exception('Could not create room: ' + x.text)

def create_meeting(OIDC, name, start, end):
	""" Create a meeting in Magnify with the user given by the OIDC """
	url = join(MAGNIFY_API_URL,'api/meetings/')
	headers = {'Content-Type':'application/json', 'Authorization':'Bearer ' + OIDC}
	string = f'{{"name":"{name}","start":"{start}","end":"{end}"}}'
	data = json.loads(string)

	x = requests.post(url=url, headers=headers, data=json.dumps(data))
	if not x.ok:
		raise Exception('Could not create meeting ' + x.text)

def get_user_id(OIDC):
	""" Fetch the user ID from Magnify from a given OIDC from Keycloak """
	url = join(MAGNIFY_API_URL,'api/users/me/')
	headers = {'Authorization':'Bearer ' + OIDC}

	x = requests.get(url, headers=headers)
	if not x.ok:
		raise Exception('Could not get user id: ' + x.text)

	return x.json()['id']

def add_to_meeting(OIDC, user, meeting):
	""" Add a user in a Magnify meeting """
	url = join(MAGNIFY_API_URL,'api/meeting-accesses/')
	headers = {'Content-Type':'application/json', 'Authorization':'Bearer ' + OIDC}
	string = f'{{"user":"{user}","meeting":"{meeting}"}}'
	data = json.loads(string)

	x = requests.post(url, headers=headers, data=json.dumps(data))
	if not x.ok:
		raise Exception('Could not add to meeting: ' + x.text)

def get_meetings(OIDC, start, end):
	""" Fetch upcoming meetings for a user from a given OIDC """
	url = join(MAGNIFY_API_URL,f'api/meetings/?from={start}&to={end}')
	headers = {'Authorization':'Bearer ' + OIDC}

	x = requests.get(url=url, headers=headers)
	if not x.ok:
		raise Exception('Could not get meetings: ' + x.text)

	return x.json()
