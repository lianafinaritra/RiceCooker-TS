# frozen_string_literal: true

require_relative 'utils/show'
require_relative 'model/rice_cooker'

def app
  choice = nil
  rice_cooker = RiceCooker.new

  loop do
    show('Appuyer sur un chiffre pour exécuter une action: ' \
         "\n 1 - Ajouter de l'eau" \
         "\n 2 - Cuire du riz" \
         "\n 3 - Réchauffer un ingrédient" \
         "\n 4 - Afficher les configurations globales" \
         "\n 5 - Changer les configurations globales" \
         "\n 0 - Sortir \n")

    print 'Votre choix : '
    choice = gets.chomp

    case choice
    when '1'
      system('clear')
      rice_cooker.add_water
    when '2'
      system('clear')
      if rice_cooker.water? == false
        print "\n Il faut ajouter de l'eau avant de cuire \n"
      else
        print 'Que voulez cuire ? (vary gasy/vary mena/tsipala): '
        element_type = gets.chomp
        print 'Temps de cuisson (en secondes) : '
        cooking_time = gets.chomp.to_i

        if cooking_time.zero?
          show('Temps de cuisson non valide')
        else
          rice_cooker.start_cooking(element_type, cooking_time)
        end
      end
    when '3'
      system('clear')
      if rice_cooker.water? == false
        print "\n Il faut ajouter de l'eau avant de réchauffer \n"
      else
        print 'Que voulez réchauffer ? (ronono/vary/laoka): '
        element_type = gets.chomp
        rice_cooker.start_reheating(element_type)
      end
    when '4'
      system('clear')
      rice_cooker.show_configuration
    when '5'
      system('clear')
      print 'Entrez une nouvelle température: '
      new_temperature = gets.chomp
      rice_cooker.change_configuration(new_temperature)
    when '0'
      break
    else
      system('clear')
      show("\n Choix non valide. \n")
    end

    break if choice == '0'
  end
end

app
