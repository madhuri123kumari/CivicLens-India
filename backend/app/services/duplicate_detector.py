from math import radians, sin, cos, sqrt, atan2

def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r = 6371.0088
    dlat, dlon = radians(lat2-lat1), radians(lon2-lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1))*cos(radians(lat2))*sin(dlon/2)**2
    return 2*r*atan2(sqrt(a), sqrt(1-a))

def likely_spatial_duplicate(lat1: float, lon1: float, lat2: float, lon2: float, radius_km: float = 0.15) -> bool:
    return haversine_km(lat1, lon1, lat2, lon2) <= radius_km
