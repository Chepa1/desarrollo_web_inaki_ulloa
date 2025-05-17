from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# modelos
class Region(Base):
    __tablename__ = "region"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    comunas = relationship("Comuna", back_populates="region")

class Comuna(Base):
    __tablename__ = "comuna"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer, ForeignKey("region.id"), nullable=False)
    region = relationship("Region", back_populates="comunas")
    actividades = relationship("Actividad", back_populates="comuna")

class Actividad(Base):
    __tablename__ = "actividad"
    id = Column(Integer, primary_key=True, autoincrement=True)
    comuna_id = Column(Integer, ForeignKey("comuna.id"), nullable=False)
    sector = Column(String(100))
    nombre = Column(String(200), nullable=False)
    email = Column(String(100), nullable=False)
    celular = Column(String(15))
    dia_hora_inicio = Column(DateTime, nullable=False)
    dia_hora_termino = Column(DateTime)
    descripcion = Column(String(500))
    comuna = relationship("Comuna", back_populates="actividades")
    fotos = relationship("Foto", back_populates="actividad", cascade="all, delete")
    contactos = relationship("ContactarPor", back_populates="actividad", cascade="all, delete")
    temas = relationship("ActividadTema", back_populates="actividad", cascade="all, delete")

class Foto(Base):
    __tablename__ = "foto"
    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(Integer, ForeignKey("actividad.id"), nullable=False)
    actividad = relationship("Actividad", back_populates="fotos")

class ContactarPor(Base):
    __tablename__ = "contactar_por"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(50), nullable=False)
    identificador = Column(String(150), nullable=False)
    actividad_id = Column(Integer, ForeignKey("actividad.id"), nullable=False)
    actividad = relationship("Actividad", back_populates="contactos")

class ActividadTema(Base):
    __tablename__ = "actividad_tema"
    id = Column(Integer, primary_key=True, autoincrement=True)
    tema = Column(String(50), nullable=False)
    glosa_otro = Column(String(15))
    actividad_id = Column(Integer, ForeignKey("actividad.id"), nullable=False)
    actividad = relationship("Actividad", back_populates="temas")

# funciones
def list_actividades(limit=5):
    session = SessionLocal()
    actividades = session.query(Actividad).order_by(Actividad.dia_hora_inicio.desc()).limit(limit).all()
    session.close()
    return actividades

def get_actividad_by_id(actividad_id):
    session = SessionLocal()
    actividad = session.query(Actividad).get(actividad_id)
    session.close()
    return actividad

def create_actividad(data):
    session = SessionLocal()
    nueva = Actividad(**data)
    session.add(nueva)
    session.commit()
    session.refresh(nueva)
    session.close()


def add_tema(actividad_id, tema, glosa_otro=None):
    session = SessionLocal()
    at = ActividadTema(actividad_id=actividad_id, tema=tema, glosa_otro=glosa_otro)
    session.add(at)
    session.commit()
    session.close()


def add_contacto(actividad_id, nombre, identificador):
    session = SessionLocal()
    cp = ContactarPor(actividad_id=actividad_id, nombre=nombre, identificador=identificador)
    session.add(cp)
    session.commit()
    session.close()


def add_foto(actividad_id, ruta_archivo, nombre_archivo):
    session = SessionLocal()
    f = Foto(actividad_id=actividad_id, ruta_archivo=ruta_archivo, nombre_archivo=nombre_archivo)
    session.add(f)
    session.commit()
    session.close()
