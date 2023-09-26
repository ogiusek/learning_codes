#include <iostream>
#include <vector>

using namespace std;

// g++ main.cpp -o program && echo 'compiled' && ./program

int getIndex(vector<int> arr, int searched)
{
  int min = 0;
  int max = arr.size() - 1;

  while (min < max)
  {
    int middle = ((max - min) / 2) + min;

    if (arr[middle] == searched)
      return middle;

    if (arr[middle] < searched && min != middle)
      min = middle;
    else
      max = middle;
  }
  return -1;
}

int main()
{
  vector<int> numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
  int searchedNumber = 11;

  // cout << getIndex(numbers, searchedNumber) << endl;
  cout << "3 got index in array " << getIndex(numbers, searchedNumber) << endl;

  return 0;
}