from django.shortcuts import render

# Create your views here.

def render_frontend(request):
    return render(request, "index.html")