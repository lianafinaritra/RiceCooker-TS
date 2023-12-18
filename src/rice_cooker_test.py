import unittest
from unittest.mock import patch, MagicMock
from model.rice_cooker import RiceCooker

class TestRiceCooker(unittest.TestCase):

    def test_should_not_have_water(self):
        rice_cooker = RiceCooker()
        self.assertEqual(rice_cooker.hasWater, False)

    def test_should_have_water(self):
        rice_cooker = RiceCooker()
        rice_cooker.addWater()
        self.assertEqual(rice_cooker.hasWater, True)

    @patch('asyncio.sleep', new_callable=MagicMock)
    async def test_should_cook_vary_gasy_successfully(self, mock_sleep):
        rice_cooker = RiceCooker()
        rice_cooker.addWater()

        with self.assertLogs() as cm:
            await rice_cooker.startCooking('vary gasy', 3)

        mock_sleep.assert_called_once_with(3)
        self.assertEqual(rice_cooker.hasWater, False)
        self.assertIn('Le riz est cuit.', cm.output)

    @patch('asyncio.sleep', new_callable=MagicMock)
    async def test_should_reheat_ronono_successfully(self, mock_sleep):
        rice_cooker = RiceCooker()
        rice_cooker.addWater()

        with self.assertLogs() as cm:
            await rice_cooker.startReheating('ronono')

        mock_sleep.assert_called_once_with(5)  # Assuming 'ronono' has a default time of 5 seconds
        self.assertEqual(rice_cooker.hasWater, False)
        self.assertIn('Réchauffement terminé', cm.output)

    def test_should_not_cooking(self):
        rice_cooker = RiceCooker()
        rice_cooker.stopCooking()
        self.assertEqual(rice_cooker.isCooking, False)

if __name__ == '__main__':
    unittest.main()
