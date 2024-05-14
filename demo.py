class Complex:
    def __init__(self, a, b):
        self.real = a
        self.imag = b
    

    def __add__(self, other):
        temp = Complex()
        temp.real = self.real + other.real
        temp.imag = self.imag + other.imag
        return temp


num1 = Complex(1, 2)

num2 = Complex(3, 4)


num3 = num1 + num2
print(num3.real, num3.imag)