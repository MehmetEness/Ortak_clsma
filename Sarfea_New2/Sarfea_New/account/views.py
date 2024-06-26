from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def login_request(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("home")
        else:
            return render(request, "account/login.html", {
                "error":"Kullanıcı adı veya parola yanlış"
            })
    else:
        return render(request, "account/login.html")

def logout_request(request):
    logout(request)
    return redirect("login")