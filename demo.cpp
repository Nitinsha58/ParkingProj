#include<iostream>


class Nitin{
    static int count;
    public:
        Nitin(){
            count++;
            std::cout << count;
        }
};

int Nitin::count = 0;

int main(){
    
    Nitin n1;
    Nitin n2;


    return 0; 
}