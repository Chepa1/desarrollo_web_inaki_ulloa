import re
import filetype
from database.db import SessionLocal, Comuna, Region

def validate_region(value):
    if not value:
        return False
    session = SessionLocal()
    exists = session.query(Region).filter(Region.id == int(value)).first() is not None
    session.close()
    return True if exists else False

def validate_comuna(value):
    if not value:
        return False
    session = SessionLocal()
    exists = session.query(Comuna).filter(Comuna.id == int(value)).first() is not None
    session.close()
    return True if exists else False

def validate_nombre(value):
    return bool(value) and len(value) <= 200

def validate_email(value):
    return "@" in value

def validate_phone(value):
    if not value:
        return True
    return bool(re.search(r"^\+569\d{8}$", value))

def validate_tiempo_inicio(value):
    return bool(re.match(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$", value))

def validate_tiempo_termino(inicio, termino):
    if not termino:
        return True
    if not validate_tiempo_inicio(inicio):
        return False
    if not validate_tiempo_inicio(termino):
        return False
    return termino > inicio

def validate_sector(value):
    return True if not value else len(value) <= 100

def validate_descripcion(value):
    return True if not value else len(value) <= 1000

def validate_foto(foto):
    ALLOWED_EXTENSIONS = {"png","jpg","jpeg","gif"}
    ALLOWED_MIMETYPES = {"image/jpeg","image/png","image/gif"}

    if foto is None:
        return False
    if foto.filename == "":
        return False
    guess = filetype.guess(foto)
    if not guess:
        return False
    if guess.extension not in ALLOWED_EXTENSIONS:
        return False
    if guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True

def validate_fotos(files):
    errors = {}
    # al menos la primera foto es obligatoria
    foto1 = files.get("foto1")
    if foto1 is None or foto1.filename == "":
        errors["foto1"] = "Debe subir al menos una foto."
    # validación para cada foto habilitada
    for i in range(1,6):
        key = f"foto{i}"
        foto = files.get(key)
        if foto and foto.filename:
            if not validate_foto(foto):
                errors[key] = "Foto no válida."
    return errors
