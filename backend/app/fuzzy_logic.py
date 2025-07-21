from datetime import datetime

def triangular(x, a, b, c):
    if x <= a or x >= c: return 0.0
    if x <= b:         return (x - a) / (b - a)
    return               (c - x) / (c - b)

def fuzzify_income(x):
    return {
        "sangat rendah": triangular(x, 0,      1_500_000, 2_800_000),
        "rendah":        triangular(x, 2_500_000,4_000_000, 6_000_000),
        "normal":        triangular(x, 5_000_000,7_000_000, 9_000_000),
        "tinggi":        triangular(x, 8_000_000,10_000_000,12_000_000),
        "sangat tinggi": triangular(x,12_000_000,15_000_000,20_000_000),
    }

def fuzzify_expense(x):
    return {
        "sangat rendah": triangular(x, 0,        800_000,   2_000_000),
        "rendah":        triangular(x, 1_500_000,3_000_000, 5_000_000),
        "sedang":        triangular(x, 4_000_000,6_500_000, 9_000_000),
        "tinggi":        triangular(x, 8_000_000,11_000_000,14_000_000),
        "sangat tinggi": triangular(x,12_000_000,16_000_000,20_000_000),
    }

PRIORITY_WEIGHT = {"primer":1.2,"sekunder":1.0,"tersier":0.8}

BASE_RULES = [
    ("sangat rendah","sangat rendah","sangat hemat"),
    ("sangat rendah","rendah",       "hemat"),
    ("sangat rendah","sedang",       "normal"),
    ("sangat rendah","tinggi",       "boros"),
    ("sangat rendah","sangat tinggi","sangat boros"),

    ("rendah",     "sangat rendah","hemat"),
    ("rendah",     "rendah",       "normal"),
    ("rendah",     "sedang",       "boros"),
    ("rendah",     "tinggi",       "sangat boros"),
    ("rendah",     "sangat tinggi","sangat boros"),

    ("normal",     "sangat rendah","hemat"),
    ("normal",     "rendah",       "normal"),
    ("normal",     "sedang",       "boros"),
    ("normal",     "tinggi",       "sangat boros"),
    ("normal",     "sangat tinggi","sangat boros"),

    ("tinggi",     "sangat rendah","hemat"),
    ("tinggi",     "rendah",       "normal"),
    ("tinggi",     "sedang",       "normal"),
    ("tinggi",     "tinggi",       "boros"),
    ("tinggi",     "sangat tinggi","sangat boros"),

    ("sangat tinggi","sangat rendah","sangat hemat"),
    ("sangat tinggi","rendah",       "hemat"),
    ("sangat tinggi","sedang",       "normal"),
    ("sangat tinggi","tinggi",       "boros"),
    ("sangat tinggi","sangat tinggi","sangat boros"),
]

OUTPUT_WEIGHTS = {
    "sangat boros":0, "boros":25, "normal":50, "hemat":75, "sangat hemat":100
}

def inference(income_lv, expense_lv, priority):
    w = PRIORITY_WEIGHT.get(priority,1.0)
    acts = []
    for inc, exp, out in BASE_RULES:
        deg = min(income_lv.get(inc,0), expense_lv.get(exp,0)) * w
        if deg>0: acts.append((out,deg))
    return acts

def defuzzify(acts):
    agg = {}
    for lbl,deg in acts:
        agg[lbl] = max(agg.get(lbl,0),deg)
    num = sum(agg[l]*OUTPUT_WEIGHTS[l] for l in agg)
    den = sum(agg.values())
    return (num/den) if den else 0.0

def fuzzy_system(income, expense, priority="sekunder"):
    inc_lv = fuzzify_income(income)
    exp_lv = fuzzify_expense(expense)
    acts  = inference(inc_lv, exp_lv, priority)
    score = defuzzify(acts)
    if score<20:   lbl="sangat boros"
    elif score<40: lbl="boros"
    elif score<60: lbl="normal"
    elif score<80: lbl="hemat"
    else:          lbl="sangat hemat"
    return round(score,2), lbl
