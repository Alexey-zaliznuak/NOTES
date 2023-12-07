import requests


class UrlPath(str):
    def __truediv__(self, other: str):
        return UrlPath(self + other + '/')


NOTES_URL = UrlPath('http://127.0.0.1:3000/')


def test_users_post():
    url = NOTES_URL / 'users'
    response = requests.post(url, json={
        'name': 'World1234561237',
        'email': 'examplemailmail@mail.com',
    })

    print(url, ":", response.status_code, response.json())

def test_users_put():
    url = NOTES_URL / 'users' / '2'
    response = requests.put(url, json={
        'name': 'New na,e for 2',
        'email': 'testic@gmail.com',

    })

    print(url, ":", response.status_code, response.json())


def test_users_delete():
    url = NOTES_URL / 'users' / '2'
    response = requests.delete(url)
    print(url, ":", response.status_code, response.json())




def test_notes_post():
    url = NOTES_URL / 'notes'
    response = requests.post(url, json={
        'title': 'First nasdfgeote',
        'text': 'Therfgfedis is the my first note',
        'author': 3
    })

    print(url, ":", response.status_code, response.json())

def test_notes_put():
    url = NOTES_URL / 'notes' / '2'
    response = requests.put(url, json={
        'title': 'New na,e for 2',
        'text': 'testic@gmail.com'
    })

    print(url, ":", response.status_code, response.json())


def test_notes_delete():
    url = NOTES_URL / 'notes' / '2'
    response = requests.delete(url)
    print(url, ":", response.status_code, response.json())


def test_get_users():
    url = NOTES_URL / 'users'
    response = requests.get(url)
    print(url, ":", response.status_code, response.json())


def test_get_users_detail():
    url = NOTES_URL / 'users' / '3'
    response = requests.get(url)
    print(url, ":", response.status_code, response.json())


def test_get_notes():
    url = NOTES_URL / 'notes'
    response = requests.get(url)
    print(url, ":", response.status_code, response.json())


def test_get_notes_detail():
    url = NOTES_URL / 'notes' / '3'
    response = requests.get(url)
    print(url, ":", response.status_code, response.json())


# test_notes_post()

# test_get_notes()
test_get_notes_detail()

