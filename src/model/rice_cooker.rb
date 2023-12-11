# frozen_string_literal: true

require_relative '../constants/ELEMENTS'
require_relative '../utils/show'
require_relative '../constants/INGREDIENTS'

# This class represents a rice cooker and provides methods for cooking and reheating.
class RiceCooker
  def initialize
    @is_cooking = false
    @temperature = '32'
    @has_water = false
  end

  def show_loading_animation(is_reheating)
    frames = ['(°)', '(¬)', '(°)', '(¬)']
    frame_index = 0

    set_interval(0.5) do
      if is_reheating == true
        print "\r#{frames[frame_index]} En train de réchauffer..."
      else
        print "\r#{frames[frame_index]} En cours de cuisson..."
      end
      frame_index = (frame_index + 1) % frames.length
    end
  end

  def add_water
    @has_water = true
  end

  def water?
    @has_water
  end

  def show_configuration
    show("\n La température de globale de cuisson est: #{@temperature}° \n")
  end

  def change_configuration(new_temp)
    converted_temp = new_temp.to_i
    if converted_temp.zero? && new_temp != '0'
      show("\n Température invalide \n")
    else
      @temperature = new_temp
    end
  end

  def start_reheating(element_type)
    if %w[ronono vary laoka].include?(element_type)
      search_type = INGREDIENTS.find { |item| item[:name] == element_type }
      @is_cooking = true
      @has_water = false
      loading_animation = show_loading_animation(true)

      begin
        sleep(search_type[:time])
      rescue StandardError
        show("\n Cuisson interrompue \n")
        clear_interval(loading_animation)
        stop_cooking
      end

      clear_interval(loading_animation)

      show("\n Réchauffement terminé (Appuyez sur Entrée) \n")

      stop_cooking
    else
      show("Le rice cooker ne peut pas réchauffer ce type d'élément")
    end
  end

  def start_cooking(element_type, cooking_time)
    if ['vary gasy', 'vary mena', 'tsipala'].include?(element_type)
      search_type = ELEMENTS.find { |item| item[:name] == element_type }
      @is_cooking = true
      @has_water = false
      loading_animation = show_loading_animation(false)
      limit = search_type[:time] || 5

      begin
        sleep(cooking_time)
      rescue StandardError
        show("\n Cuisson interrompue \n")
        clear_interval(loading_animation)
        stop_cooking
      end

      clear_interval(loading_animation)

      if limit > cooking_time
        show("\n Le riz n'est pas assez cuit, il manque du temps (Appuyer sur Entrée) \n")
      elsif (cooking_time > limit - 1) && (limit + 2 > cookingTime)
        show("\n Le riz est cuit (Appuyer sur Entrée) \n")
      else
        show("\n Trop longtemps, le riz est brûlé (Appuyer sur Entrée) \n")
      end

      stop_cooking
    else
      show("Le rice cooker ne peut pas cuire ce type d'élément")
    end
  end

  def stop_cooking
    if @is_cooking
      @is_cooking = false
      begin
        $stdin.read_nonblock(4096)
      rescue StandardError
        nil
      end
    else
      show("\n Le rice cooker n'est pas en train de cuire. \n")
    end
  end

  private

  def set_interval(delay, &block)
    Thread.new do
      loop do
        sleep(delay)
        block.call
      end
    end
  end

  def clear_interval(thread)
    thread.kill
  end
end
