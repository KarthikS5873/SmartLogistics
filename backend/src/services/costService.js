export const calculateCost = (weight, transport) => {
  const rates = {
    Truck: 10,
    Air: 20,
    Ship: 8
  }

  return weight * rates[transport]
}
