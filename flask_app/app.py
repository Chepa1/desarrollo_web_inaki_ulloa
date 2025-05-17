from flask import Flask, request, render_template, redirect, url_for
import database.db as db
from werkzeug.utils import secure_filename
import os
from datetime import datetime

UPLOAD_FOLDER = "static/uploads"

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Rutas
@app.route("/", methods=["GET"])
def index():
    actividades = db.list_actividades()
    return render_template("index.html", actividades=actividades)

@app.route("/actividad/nueva", methods=["GET", "POST"])
def nueva_actividad():
    if request.method == "POST":
        data = {
            "comuna_id": request.form.get("comuna"),
            "sector": request.form.get("sector"),
            "nombre": request.form.get("nombre"),
            "email": request.form.get("email"),
            "celular": request.form.get("celular"),
            "dia_hora_inicio": datetime.strptime(request.form.get("dia_hora_inicio"), "%Y-%m-%dT%H:%M"),
            "dia_hora_termino": datetime.strptime(request.form.get("dia_hora_termino"), "%Y-%m-%dT%H:%M"),
            "descripcion": request.form.get("descripcion")
        }
        nueva = db.create_actividad(data)
        for tema in request.form.getlist("temas"):
            if tema == "otro":
                glosa = request.form.get("glosa_otro")
                db.add_tema(nueva.id, tema, glosa)
            else:
                db.add_tema(nueva.id, tema)
        for contacto in request.form.getlist("contactar_por"):
            identificador = request.form.get(contacto)
            db.add_contacto(nueva.id, contacto, identificador)
        for file in request.files.getlist("fotos"):
            if file and file.filename:
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                file.save(filepath)
                db.add_foto(nueva.id, filepath, filename)
        return redirect(url_for("index"))
    session = db.SessionLocal()
    regiones = session.query(db.Region).all()
    session.close()
    return render_template("agregar-actividad.html", regiones=regiones)

@app.route("/actividades", methods=["GET"])
def listado_actividades():
    actividades = db.list_actividades()
    return render_template("listado.html", actividades=actividades)

@app.route("/actividades/<int:actividad_id>", methods=["GET"])
def detalle_actividad(actividad_id):
    actividad = db.get_actividad_by_id(actividad_id)
    if not actividad:
        return redirect(url_for("listado_actividades"))
    return render_template("detalle.html", actividad=actividad)

@app.route("/estadisticas", methods=["GET"])
def estadisticas():
    return render_template("estadisticas.html")

if __name__ == "__main__":
    app.run(debug=True)